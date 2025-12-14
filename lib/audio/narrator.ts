import type { VoiceId, NarratorOptions } from "./types";

// Voice ID mapping for ElevenLabs
// These will need to be configured with actual ElevenLabs voice IDs
const VOICE_IDS: Record<VoiceId, string> = {
  "game-host": "default", // Replace with actual voice ID
  "dramatic-host": "default",
  pirate: "default",
  robot: "default",
  butler: "default",
  surfer: "default",
  detective: "default",
  shakespeare: "default",
  "valley-girl": "default",
  announcer: "default",
  electric: "default",
  gamer: "default",
  alien: "default",
  retro: "default",
  focused: "default",
  intense: "default",
  elegant: "default",
  explorer: "default",
};

// Speech queue for sequential narration
interface NarrationQueueItem {
  text: string;
  options: NarratorOptions;
  resolve: () => void;
  reject: (error: Error) => void;
}

class Narrator {
  private queue: NarrationQueueItem[] = [];
  private isProcessing = false;
  private currentAudio: HTMLAudioElement | null = null;
  private apiKey: string | null = null;

  constructor() {
    // Get API key from environment
    this.apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || null;

    if (!this.apiKey) {
      console.warn(
        "ElevenLabs API key not configured. Voice narration will be disabled."
      );
    }
  }

  /**
   * Speak text using ElevenLabs TTS
   */
  async speak(text: string, options: NarratorOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      this.queue.push({ text, options, resolve, reject });

      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  /**
   * Stop current speech and clear queue
   */
  stop(): void {
    this.queue = [];
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    this.isProcessing = false;
  }

  /**
   * Check if currently speaking
   */
  get isSpeaking(): boolean {
    return this.isProcessing || this.queue.length > 0;
  }

  /**
   * Process narration queue
   */
  private async processQueue(): Promise<void> {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const item = this.queue.shift()!;

    try {
      // Pause before speaking if specified
      if (item.options.pauseBefore) {
        await this.sleep(item.options.pauseBefore);
      }

      // Generate and play speech
      await this.generateAndPlay(item.text, item.options);

      // Pause after speaking if specified
      if (item.options.pauseAfter) {
        await this.sleep(item.options.pauseAfter);
      }

      // Call completion callback
      if (item.options.onComplete) {
        item.options.onComplete();
      }

      item.resolve();
    } catch (error) {
      console.error("Narration error:", error);

      if (item.options.onError) {
        item.options.onError(error as Error);
      }

      item.reject(error as Error);
    }

    // Process next item
    this.processQueue();
  }

  /**
   * Generate speech and play it
   */
  private async generateAndPlay(
    text: string,
    options: NarratorOptions
  ): Promise<void> {
    // If no API key, fall back to silent mode
    if (!this.apiKey) {
      console.log("[Narrator]", text);
      await this.sleep(text.length * 50); // Simulate speech duration
      return;
    }

    try {
      const voiceId = VOICE_IDS[options.voice || "game-host"];
      const stability = options.emotion === "excited" ? 0.3 : 0.5;
      const similarityBoost = 0.75;
      const speed = options.speed || 1.0;

      // Call ElevenLabs API
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": this.apiKey,
          },
          body: JSON.stringify({
            text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability,
              similarity_boost: similarityBoost,
              style: options.emotion === "dramatic" ? 0.5 : 0,
              use_speaker_boost: true,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      // Get audio blob
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Play audio
      await this.playAudio(audioUrl, speed);

      // Cleanup
      URL.revokeObjectURL(audioUrl);
    } catch (error) {
      console.error("Failed to generate speech:", error);
      // Fallback to console log
      console.log("[Narrator]", text);
      await this.sleep(text.length * 50);
    }
  }

  /**
   * Play audio from URL
   */
  private playAudio(url: string, playbackRate = 1.0): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.playbackRate = playbackRate;

      this.currentAudio = audio;

      audio.addEventListener("ended", () => {
        this.currentAudio = null;
        resolve();
      });

      audio.addEventListener("error", (error) => {
        this.currentAudio = null;
        reject(error);
      });

      audio.play().catch(reject);
    });
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const narrator = new Narrator();

// Export for testing
export { Narrator };

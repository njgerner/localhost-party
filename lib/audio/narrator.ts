import type { VoiceId, NarratorOptions } from "./types";
import { ELEVENLABS_MODELS, RATE_LIMITS } from "./constants";

// Voice ID mapping for ElevenLabs
const VOICE_IDS: Record<VoiceId, string> = {
  "game-host": "lIkvgvMqGbN2y0vNTyg8", // Custom: Localhost Party Host
  "dramatic-host": "pNInz6obpgDQGcFmaJgB", // Adam - brash and confident
  pirate: "SOYHLrjzK2X1ezoPC6cr", // Harry - animated warrior
  robot: "N2lVS1w4EtoT3dr4eOWO", // Callum - gravelly, unsettling
  butler: "JBFqnCBsd6RMkjVDRZzb", // George - warm British resonance
  surfer: "IKne3meq5aSn9XLyUdCD", // Charlie - young Australian, energetic
  detective: "onwK4e9ZLuTAKqWW03F9", // Daniel - British, formal
  shakespeare: "JBFqnCBsd6RMkjVDRZzb", // George - warm British
  "valley-girl": "FGY2WhTYpPnrIDTdsKH5", // Laura - sassy young female
  announcer: "pqHfZKP75CvOlQylNhV4", // Bill - crisp, friendly narrator
  electric: "TX3LPaxmHKxFdv7VOQHJ", // Liam - energetic young male
  gamer: "IKne3meq5aSn9XLyUdCD", // Charlie - hyped Australian
  alien: "N2lVS1w4EtoT3dr4eOWO", // Callum - unsettling edge
  retro: "CwhRBWXzGAHq8TQ4Fs17", // Roger - classy, easy going
  focused: "cjVigY5qzO86Huf0OWal", // Eric - smooth, professional
  intense: "pNInz6obpgDQGcFmaJgB", // Adam - aggressive confidence
  elegant: "Xb7hH8MSUJpSbSDYk0k2", // Alice - British professional
  explorer: "nPczCjzI2devNBz1zQrb", // Brian - resonant, comforting
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
  private lastCallTimestamp = 0;
  private callCount = 0;
  private callTimestamps: number[] = [];

  constructor() {
    // API key will be set at runtime via setApiKey()
    // This is necessary because process.env is not available in client-side code
  }

  /**
   * Set the ElevenLabs API key for TTS
   * Should be called on client initialization
   */
  setApiKey(key: string | null): void {
    this.apiKey = key;
    if (!key && process.env.NODE_ENV === "development") {
      console.warn(
        "ElevenLabs API key not configured. Voice narration will use fallback."
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
   * Check if rate limit is exceeded
   * Prevents API abuse by limiting calls to max per minute
   */
  private isRateLimited(): boolean {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Remove timestamps older than 1 minute
    this.callTimestamps = this.callTimestamps.filter(
      (timestamp) => timestamp > oneMinuteAgo
    );

    // Check if we've exceeded the rate limit
    if (
      this.callTimestamps.length >= RATE_LIMITS.NARRATOR_MAX_CALLS_PER_MINUTE
    ) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[Narrator] Rate limit exceeded: ${this.callTimestamps.length} calls in the last minute. Max allowed: ${RATE_LIMITS.NARRATOR_MAX_CALLS_PER_MINUTE}`
        );
      }
      return true;
    }

    return false;
  }

  /**
   * Record an API call for rate limiting
   */
  private recordApiCall(): void {
    this.callTimestamps.push(Date.now());
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
      if (process.env.NODE_ENV === "development") {
        console.error("Narration error:", error);
      }

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
      if (process.env.NODE_ENV === "development") {
        console.log("[Narrator]", text);
      }
      await this.sleep(text.length * 50); // Simulate speech duration
      return;
    }

    // Check rate limit before making API call
    if (this.isRateLimited()) {
      if (process.env.NODE_ENV === "development") {
        console.log("[Narrator - Rate Limited]", text);
      }
      await this.sleep(text.length * 50); // Simulate speech duration
      return;
    }

    try {
      const voiceId = VOICE_IDS[options.voice || "game-host"];
      const stability = options.emotion === "excited" ? 0.3 : 0.5;
      const similarityBoost = 0.75;
      const speed = options.speed || 1.0;

      // Record this API call for rate limiting
      this.recordApiCall();

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
            model_id: ELEVENLABS_MODELS.TURBO_V2_5,
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
        const errorText = await response.text();
        if (process.env.NODE_ENV === "development") {
          console.error(
            `ElevenLabs API error [${response.status}]:`,
            errorText
          );
        }
        throw new Error(
          `ElevenLabs API error: ${response.status} ${response.statusText}`
        );
      }

      // Get audio blob
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Play audio
      await this.playAudio(audioUrl, speed);

      // Cleanup
      URL.revokeObjectURL(audioUrl);
    } catch (error) {
      // Fallback to silent mode (API unavailable or key invalid)
      if (process.env.NODE_ENV === "development") {
        console.log("[Narrator - Fallback Mode]", text);
        if (this.apiKey) {
          // Only show detailed error if API key is configured but failing
          console.warn(
            "ElevenLabs API call failed, using text fallback:",
            error instanceof Error ? error.message : error
          );
        }
      }
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

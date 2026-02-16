
import os
import base64
import logging
from typing import List, Any
from sarvamai import SarvamAI
from dotenv import load_dotenv

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
load_dotenv()


class SarvamManager:
    def __init__(self):
        api_key = os.getenv("SARVAM_API_KEY")
        if not api_key:
            logger.error("Environment Variable 'SARVAM_API_KEY' is missing.")
            raise ValueError("Sarvam API Key not found. Please check your .env file.")
        self.client = SarvamAI(api_subscription_key=api_key)
        logger.info("SarvamManager initialized successfully.")

    def transcribe_hinglish(self, audio_bytes: bytes) -> str:
        temp_filename = "temp_audio_input.wav"
        try:
            if not audio_bytes:
                return "Error: Empty audio buffer."
            with open(temp_filename, "wb") as f:
                f.write(audio_bytes)
            with open(temp_filename, "rb") as audio_file:
                response = self.client.speech_to_text.transcribe(
                    file=audio_file,
                    model="saaras:v3",
                    language_code="unknown",
                    mode="codemix"
                )
            transcript = getattr(response, "transcript", "")
            return transcript if transcript else "Could not detect any speech."
        except Exception as e:
            logger.error(f"Speech-to-Text Failure: {str(e)}")
            return f"Service Error: {str(e)}"
        finally:
            if os.path.exists(temp_filename):
                os.remove(temp_filename)

    def analyze_wound(self, image_bytes: bytes) -> str:
        try:
            if not image_bytes:
                return "Error: No image provided."
            b64_image = base64.b64encode(image_bytes).decode("utf-8")
            clinical_prompt = (
                "Identify signs of Erythema (redness), swelling, or infection. "
                "Rate severity from 1-10 and provide recovery advice."
            )
            messages: List[Any] = [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": clinical_prompt},
                        {
                            "type": "image_url",
                            "image_url": {"url": f"data:image/jpeg;base64,{b64_image}"}
                        }
                    ]
                }
            ]
            response = self.client.chat.completions(messages=messages)
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Vision Service Failure: {str(e)}")
            return "Wound analysis failed. Please ensure the image is clear and try again."
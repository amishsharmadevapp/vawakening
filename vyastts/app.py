import gradio as gr
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline

# Load model
model_id = "facebook/mms-tts-hin"
model = AutoModelForSpeechSeq2Seq.from_pretrained(model_id)
processor = AutoProcessor.from_pretrained(model_id)

# Setup pipeline
tts = pipeline("text-to-speech", model=model, tokenizer=processor.tokenizer)

def generate_speech(text):
    output = tts(text)
    return output["audio"]

demo = gr.Interface(fn=generate_speech, inputs="text", outputs="audio")
demo.launch()

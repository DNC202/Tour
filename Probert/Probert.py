from flask import Flask, request, jsonify
import torch
from transformers import RobertaForSequenceClassification, AutoTokenizer

app = Flask(__name__)

model = RobertaForSequenceClassification.from_pretrained("wonrax/phobert-base-vietnamese-sentiment")
tokenizer = AutoTokenizer.from_pretrained("wonrax/phobert-base-vietnamese-sentiment", use_fast=False)


@app.route('/api/v1/summarize', methods=['POST'])
def predict_sentiment():
    if request.method == 'POST':
        data = request.get_json()
        sentence = data['sentence']

        input_ids = torch.tensor([tokenizer.encode(sentence)])

        with torch.no_grad():
            out = model(input_ids)
            probabilities = out.logits.softmax(dim=-1).tolist()[0]

        # Sắp xếp danh sách xác suất và lấy phần tử có xác suất cao nhất
        max_prob_index = max(range(len(probabilities)), key=probabilities.__getitem__)
        max_prob_label = ['negative', 'positive', 'neutral'][max_prob_index]

        response = {
            # 'sentence': sentence,
            # 'max_probability_label': max_prob_label,
            'probret': max_prob_label,
            'max_probability': probabilities[max_prob_index]
        }

        return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)

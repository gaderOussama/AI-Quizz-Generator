const axios= require('axios');

exports.handlePDFUpload = async (req, res) => {
    try {
        const difficulty = req.body.difficulty || 'medium';
        const num_questions = parseInt(req.body.num_questions) || 5;
        const AI_Url = "http://0.0.0.0:5000/generate-quiz";

        let aiPayload = { difficulty, num_questions };

        if (req.file) {
            aiPayload.pdf_base64 = req.file.buffer.toString('base64');
        } else if (req.body.text) {
            aiPayload.text = req.body.text;
        } else {
            return res.status(400).json({ error: 'No file or text provided' });
        }

        const airesponse = await axios.post(AI_Url, aiPayload, { timeout: 120000 });
        const quiz = airesponse.data.questions || [];

        return res.json({
            questions: quiz,
            message: 'Quiz generated successfully'
        });
    } catch (error) {
        console.error('Error generating quiz:', error);
        return res.status(500).json({ error: 'Failed to generate quiz' });
    }
}
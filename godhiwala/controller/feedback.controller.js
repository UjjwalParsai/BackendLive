import Feedback from "../models/feedback.model.js";
export const save = (request, response, next) => {
    Feedback.create(request.body.feedback)
        .then(result => {
            console.log(result);
            return response.status(200).json({ Message: "Feedback are saved...", status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        })
}

export const viewAll = (request, response, next) => {
    Feedback.find()
        .then(result => {
            console.log(result);
            return response.status(200).json({ result: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        })
}


export const remove = (request, response, next) => {
    Feedback.deleteOne({ _id: request.params.id }).then(() => {
        return response.status(200).json({ message: "Feedback is Removed", status: true });
    }).catch((err) => {

        console.log(err)
        return response.status(500).json({ error: "Internal Server Error", status: false });
    })
};
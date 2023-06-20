import Request from "../models/request.model.js";

export const saveMultiple = (request, response, next) => {
    Request.create(request.body.requests)
        .then(result => {
            console.log(result);
            return response.status(200).json({ Message: "Request are saved...", status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        })
}

export const viewAll = (request, response, next) => {
    Request.find()
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
    Request.deleteOne({ _id: request.params.id }).then(() => {
        return response.status(200).json({ message: "Request is Removed", status: true });
    }).catch((err) => {

        console.log(err)
        return response.status(500).json({ error: "Internal Server Error", status: false });
    })
};

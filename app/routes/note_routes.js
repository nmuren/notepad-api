module.exports = function (app, db) {

    const noteSchema = new db.base.Schema({
        text: String,
        title: String
    });

    const Note = db.model("notepadCollection", noteSchema);

    app.get('/notes/:id', (req, res) => {
        const searchID = req.params.id;
        console.log(searchID);
        Note.findById(searchID, function (err, data) {
            if (err)
                res.send({
                    error: 'An error has occured',
                    details: err.name,
                    stack: err
                });
            else {
                res.send(data);
            }
        })
    });

    app.put('/notes/:id', (req, res) => {
        const query = { _id: req.params.id };
        const note = {
            text: req.body.title,
            title: req.body.body
        };
        const options = { new: true };
        Note.findOneAndUpdate(query, note, options, function (err, data) {
            if (err)
                res.send({
                    error: 'An error has occured',
                    details: err.name,
                    stack: err
                });
            else {
                res.send(data);
            }
        })
    });

    app.post('/notes', (req, res) => {
        const note = new Note({
            text: req.body.title,
            title: req.body.body
        });

        note.save(function (err, data) {
            if (err)
                res.send({
                    error: 'An error has occured',
                    details: err.name,
                    stacktrace: err
                });
            else {
                res.send(data);
            }
        });

    })

    app.delete('/notes/:id', (req, res) => {
        const query = { _id: req.params.id };
        Note.findOneAndRemove(query, function (err, data) {
            if (err)
                res.send({
                    error: 'An error has occured',
                    details: err.name,
                    stack: err
                });
            else {
                res.send("Item is deleted!");
            }
        })
    });
}
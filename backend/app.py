from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
CORS(app)


config = {
    "user" : "postgres",
    "password" : "postgres",
    "host" : "localhost",
    "port" : 5432,
    "database" : "mindpad"
}

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{config["user"]}:{config["password"]}@{config["host"]}:{config["port"]}/{config["database"]}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Note(db.Model):
    __tablename__ = 'notes'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    txt = db.Column(db.Text)


@app.route('/api/notes')
def notes():
    all_notes = Note.query.all()
    notes_list = [{"id": note.id, "title": note.title, "txt": note.txt} for note in all_notes]
    return jsonify(notes_list)

@app.route('/api/todo/<int:id>')
def todo_id(id):
    return jsonify(todos[id])

if __name__ == '__main__':
    app.run(debug=True)
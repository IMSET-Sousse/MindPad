from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
CORS(app)

# SQLite configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mindpad.sqlite3'
db = SQLAlchemy(app)


class Note(db.Model):
    __tablename__ = 'notes'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    txt = db.Column(db.Text)


@app.route('/api/notes', methods=['GET'])
def notes():
    all_notes = Note.query.all()

    notes_list = [
        {
            "id": note.id,
            "title": note.title,
            "txt": note.txt
        } for note in all_notes
    ]
    return jsonify(notes_list)

@app.route('/api/notes', methods=['POST'])
def notes_add():
    data = request.get_json()
    title = data.get('title')
    txt = data.get('txt')

    new_note = Note(title=title, txt=txt)
    db.session.add(new_note)
    db.session.commit()
    
    return jsonify({
        "message": "added note"
    })

@app.route('/api/todo/<int:id>')
def todo_id(id):
    return jsonify(todos[id])

if __name__ == '__main__':
    app.run(debug=True)
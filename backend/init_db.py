from app import db, app, Note

def init_db():
    with app.app_context():
        db.create_all()
        # Add a sample note
        if not Note.query.first():
            sample_note = Note(title="Sample Note", txt="This is a sample note.")
            db.session.add(sample_note)
            db.session.commit()
            print("Sample note added!")
        print("Database initialized successfully!")

if __name__ == '__main__':
    init_db()
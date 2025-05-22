import { useState } from 'react';
import styles from './Form.module.css';

export default function Form(parms) {
    let setAdded = parms.setAdded

    const [formData, setFormData] = useState({
        title: '',
        txt: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(
            prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/notes', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to add note');
            }

            // Reset form after successful submission
            setFormData({ title: '', txt: '' });
            setAdded(prev => prev + 1)
        } catch (error) {
            console.error('Error adding note:', error);
            alert('Failed to add note. Please try again.');
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Ajouter note</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Titre de la note"
                    className={styles.input}
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    id="content"
                    name="txt"
                    placeholder="Contenu de la note..."
                    className={styles.textarea}
                    value={formData.txt}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className={styles.button}>
                    Ajouter Note
                </button>
            </form>
        </div>
    );
}
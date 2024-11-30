import React, { useState } from "react";
import axios from "axios";

const MovieReviewForm = () => {
    const [formData, setFormData] = useState({
        movieId: "",
        movieTitle: "",
        comment: "",
        rating: 0,
    });
    const [message, setMessage] = useState("");

    // Atualiza o estado quando os campos do formulário mudam
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Submissão do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação da nota
        const { movieId, movieTitle, comment, rating } = formData;
        if (rating < 0 || rating > 5) {
            setMessage("A nota deve estar entre 0 e 5.");
            return;
        }

        try {
            // Envia os dados para a API
            const response = await axios.post("http://localhost:5000/api/reviews", {
                movieId: parseInt(movieId, 10), // Certifique-se de enviar números
                movieTitle,
                comment,
                rating: parseInt(rating, 10),
            });

            // Define mensagem de sucesso e reseta o formulário
            setMessage(response.data.message || "Avaliação enviada com sucesso!");
            setFormData({
                movieId: "",
                movieTitle: "",
                comment: "",
                rating: 0,
            });
        } catch (error) {
            // Define mensagem de erro
            setMessage("Erro ao enviar a avaliação. Tente novamente.");
        }
    };

    return (
        <div className="movie-review-form">
            <h2>Enviar Avaliação de Filme</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="movieId">ID do Filme:</label>
                    <input
                        type="number"
                        id="movieId"
                        name="movieId"
                        value={formData.movieId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="movieTitle">Título do Filme:</label>
                    <input
                        type="text"
                        id="movieTitle"
                        name="movieTitle"
                        value={formData.movieTitle}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comentário:</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Nota (0-5):</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Enviar Avaliação</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default MovieReviewForm;

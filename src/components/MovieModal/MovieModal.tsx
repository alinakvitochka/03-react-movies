import { useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

export default function MovieModal({
  movie,
  onClose,
}: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleBackdropClick = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {movie.backdrop_path ? (
          <img
            className={css.image}
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
        ) : (
          <div className={css.image}>
            <span className={css.noImage}>No image</span>
          </div>
        )}

        <div className={css.content}>
          <h2>{movie.title}</h2>

          <p>{movie.overview}</p>

          <p>
            <strong>Release Date:</strong>{" "}
            {movie.release_date}
          </p>

          <p>
            <strong>Rating:</strong>{" "}
            {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
import axios from "axios";
import React, { useState, useEffect } from "react";

const Comments = ({ pokemonName }) => {
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`/api/pokemon/comments/${pokemonName}`).then((response) => {
      if (response.data.length === 0) {
        return;
      } else {
        console.log(response.data);
        setComments(response.data);
      }
    });
    //this dependency forces the comments component to reload when
    // a user clicks on another pokemon in the evolution chain
  }, [pokemonName]);

  const callComments = () => {
    axios.get(`/api/pokemon/comments/${pokemonName}`).then((response) => {
      if (response.data.length === 0) {
        return;
      } else {
        setComments(response.data);
      }
    });
  };

  const updateCommentInput = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = (event) => {
    event.preventDefault();
    axios
      .post(`/api/pokemon/comments/${pokemonName}`, { comments: newComment })
      .then((response) => {
        console.log(response.data);
      })
      .then(() => callComments());
  };

  return (
    <div>
      {comments && (
        <div className="comments-list">
          {comments[0].commentPokemonName == pokemonName && (
            <div>
              <h3>Comments about {pokemonName}</h3>

              <ul>
                {comments[0].comments.map((element) => (
                  <li>{element.comments}</li>
                ))}
              </ul>
            </div>
          )}
          {/* {console.log(comments[0].comments.map((element) => element.comments))} */}
        </div>
      )}

      <div>
        <form className={" comment-form"} onSubmit={addComment}>
          <label for="comment">Comment</label>
          <input
            name="comment"
            value={newComment}
            onChange={updateCommentInput}
            placeholder="your comment here"
          />
          <button type="submit" class="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;

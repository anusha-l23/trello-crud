import "../styles/ListEditor.css";

import React, { Component } from "react";

class ListEditor extends Component {
  ref = React.createRef();

  onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.saveList();
    }
  };

  render() {
    const { title, handleChangeTitle, deleteList } = this.props;

    return (
      <div className="List-Title-Edit flex dots-color" ref={this.ref}>
        <input
          autoFocus
          className="List-Title-Textarea"
          placeholder="Enter list title..."
          value={title}
          onChange={handleChangeTitle}
          onKeyDown={this.onEnter}
      style={{  border: "none", borderBottom:"1px solid gray", outline:"none"}}
        />
        {/* {deleteList && (
          // <ion-icon name="trash" onClick={deleteList} />
          <div onClick={deleteList}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 50 50"
            >
              <path
                fill="currentColor"
                d="M20 18h2v16h-2zm4 0h2v16h-2zm4 0h2v16h-2zm-16-6h26v2H12zm18 0h-2v-1c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v1h-2v-1c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3v1z"
              ></path>
              <path
                fill="currentColor"
                d="M31 40H19c-1.6 0-3-1.3-3.2-2.9l-1.8-24l2-.2l1.8 24c0 .6.6 1.1 1.2 1.1h12c.6 0 1.1-.5 1.2-1.1l1.8-24l2 .2l-1.8 24C34 38.7 32.6 40 31 40z"
              ></path>
            </svg>
          </div>
        )} */}

        
      </div>
    );
  }
}

export default ListEditor;

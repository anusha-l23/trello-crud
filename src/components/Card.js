import "../styles/Card.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-responsive-modal";
import { Draggable } from "react-beautiful-dnd";
import CardEditor from "./CardEditor";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  //Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
//import { faCoffee } from '@fortawesome/free-light-svg-icons'

class Card extends Component {
  state = {
    editing: false,
    openModal: false,
    text: this.props.text || "",
    userInput: "",
    list: [],
    toggleCardMenu: false,
    thumb: false,
    thumbDown: false,
    hoverThumb: false,
    hoverThumb1: false
  };


  toggleCardMenu = () => {
    document.addEventListener("click", this.toggleCardMenu);
  };

  startEditing = () =>
    this.setState({
      editing: true,
      text: this.props.card.text,
    });

  onClickButton = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  endEditing = () => this.setState({ editing: false });

  editCard = async (text) => {
    const { card, dispatch } = this.props;

    this.endEditing();
    console.log(card, text);
    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card?._id, cardText: text },
    });
  };

  deleteCard = async () => {
    const { listId, card, dispatch } = this.props;
    console.log(listId, "listId");
    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId },
    });
  };

  updateInput(e) {
    this.setState({
      userInput: e.target.value,
    });
  }
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        // Add a random id which is used to delete
        id: Math.random(),

        // Add a user value to list
        value: this.state.userInput,
      };

      // Update list
      const list = [...this.state.list];
      list.push(userInput);

      // reset state
      this.setState({
        list,
        userInput: "",
      });
    }
  }

  render() {
    const { card, index, toggleMove } = this.props;
    console.log(card, "card data");

    const { editing, hoverThumb, hoverThumb1 } = this.state;

    if (!editing && card) {
      return (
        <Draggable draggableId={card?._id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="Card"
              onMouseEnter={this.startHover}
              onMouseLeave={this.endHover}
            >
              {card?.text}

              <hr style={{ marginTop: "1em", marginBottom: "2em" }} />
              <div className="lists__menu">
                <div className="flex">
                  <div className="flex-start">
                    <div className="">anusha L.</div>
                    <button
                      onClick={this.onClickButton}
                      style={{ border: "none" }}
                    >
                      <i
                        className="fa fa-comment"
                        style={{ color: "#0000FF" }}
                      ></i>
                    </button>
                    <div>
                      <Modal
                        open={this.state.openModal}
                        onClose={this.onCloseModal}
                      >
                        <p className="text-lg m-4 text-center">{card?.text}</p>
                        {this.state.list.map((item, index) => {
                          return (
                            <div key={index}>
                              <div
                                variant="dark"
                                action
                                style={{
                                  backgroundColor: "#c4c4ff",
                                  padding: "1em",
                                  marginTop: "1em",
                                }}
                              >
                                {item.value}
                                <span></span>
                              </div>
                            </div>
                          );
                        })}
                        <input
                          type="text"
                          className="width"
                          value={this.state.userInput}
                          onChange={(e) => this.updateInput(e)}
                        ></input>

                        <div className="text-center">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-lg btn-block"
                            style={{
                              backgroundColor: "#0000FF",
                              padding: "0.5em 7em 0.5em 7em",
                              marginTop: "1em",
                            }}
                            onClick={() => this.addItem()}
                          >
                            Comment
                          </button>
                        </div>
                      </Modal>
                    </div>
                  </div>
                  <div>
                    {this.state.thumb ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          onClick={() => this.setState({ thumb: false })}
                          style={{ color: "#0000FF" }}
                        >
                          <path
                            fill="currentColor"
                            d="M18 21H8V8l7-7l1.25 1.25q.175.175.288.475t.112.575v.35L15.55 8H21q.8 0 1.4.6T23 10v2q0 .175-.037.375t-.113.375l-3 7.05q-.225.5-.75.85T18 21ZM6 8v13H2V8h4Z"
                          ></path>
                        </svg>{" "}
                        <span style={{ color: "#0000FF" }}>1</span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          onMouseEnter={()=> this.setState({hoverThumb: true})}
                          onMouseLeave={()=> this.setState({hoverThumb: false})}
                          style={{ color: hoverThumb ? "#0000FF" : "#c4c4ff" }}
                          //style={{ color: this.state.hoverThumb ? "#0000FF" : "#c4c4ff" }}
                          onClick={() => this.setState({ thumb: true })}
                        >
                          <path
                            fill="currentColor"
                            d="M18 21H8V8l7-7l1.25 1.25q.175.175.288.475t.112.575v.35L15.55 8H21q.8 0 1.4.6T23 10v2q0 .175-.037.375t-.113.375l-3 7.05q-.225.5-.75.85T18 21ZM6 8v13H2V8h4Z"
                          ></path>
                        </svg>
                      </>
                    )}
{this.state.thumbDown ? (
                    <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 32 32"
                      onClick={() => this.setState({ thumbDown: false })}
                          style={{ color: "#0000FF", marginLeft: "4px" }}
                    >
                      <path
                        fill="currentColor"
                        d="M2 2h5v14H2zm21 0H9v14.803l3.042 4.563l.845 5.917A2.01 2.01 0 0 0 14.867 29H15a3.003 3.003 0 0 0 3-3v-6h8a4.005 4.005 0 0 0 4-4V9a7.008 7.008 0 0 0-7-7z"
                      ></path>
                    </svg>
                        <span style={{ color: "#0000FF" }}>1</span></>
                        )
                    : 
                    (
                      <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 32 32"
                      onMouseEnter={()=> this.setState({hoverThumb1: true})}
                      onMouseLeave={()=> this.setState({hoverThumb1: false})}
                      style={{ color: hoverThumb1 ? "#0000FF" : "#c4c4ff", marginLeft: "4px" }}
                      onClick={() => this.setState({ thumbDown: true })}
                    >
                      <path
                        fill="currentColor"
                        d="M2 2h5v14H2zm21 0H9v14.803l3.042 4.563l.845 5.917A2.01 2.01 0 0 0 14.867 29H15a3.003 3.003 0 0 0 3-3v-6h8a4.005 4.005 0 0 0 4-4V9a7.008 7.008 0 0 0-7-7z"
                      ></path>
                    </svg>
                 
                  </>
                    )}
                    <button
                      className="lists__menu-btn1"
                      onClick={() =>
                        toggleMove
                          ? this.setState({
                              toggleMove: !this.state.toggleMove,
                            })
                          : this.setState({
                              toggleCardMenu: !this.state.toggleCardMenu,
                            })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2Z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  {this.state.toggleCardMenu && (
                    <div className="lists__menu-dropdown3">
                      <ul className="ul">
                        <li
                          style={{ marginTop: "1em" }}
                          onClick={this.startEditing}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            style={{ color: "#5E6C84" }}
                          >
                            <path
                              fill="currentColor"
                              d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
                            ></path>
                          </svg>{" "}
                          Edit card
                        </li>
                        <li style={{ marginTop: "1em" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            style={{ color: "#5E6C84" }}
                          >
                            <g fill="currentColor">
                              <path d="M16 6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h2v2a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-6a4 4 0 0 0-4-4h-2V6zm-2 2h-2a4 4 0 0 0-4 4v2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2zm4 2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h6z"></path>
                            </g>
                          </svg>{" "}
                          Duplicate card
                        </li>
                        <li style={{ marginTop: "1em" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            style={{ color: "#5E6C84" }}
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            >
                              <path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12m0-.5v-2a1.5 1.5 0 1 1 3 0V12m0-1.5a1.5 1.5 0 0 1 3 0V12"></path>
                              <path d="M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2h.208a6 6 0 0 1-5.012-2.7A69.74 69.74 0 0 1 7 19c-.312-.479-1.407-2.388-3.286-5.728a1.5 1.5 0 0 1 .536-2.022a1.867 1.867 0 0 1 2.28.28L8 13"></path>
                            </g>
                          </svg>{" "}
                          Move card <span className="upgrade">UPGRADE</span>
                        </li>
                        <li style={{ marginTop: "1em" }} onClick={()=>{}}>
                          <UncontrolledDropdown setActiveFromChild>
                            <DropdownToggle tag="a" className="nav-link" caret>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                style={{ color: "#5E6C84" }}
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                >
                                  <path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12m0-.5v-2a1.5 1.5 0 1 1 3 0V12m0-1.5a1.5 1.5 0 0 1 3 0V12"></path>
                                  <path d="M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2h.208a6 6 0 0 1-5.012-2.7A69.74 69.74 0 0 1 7 19c-.312-.479-1.407-2.388-3.286-5.728a1.5 1.5 0 0 1 .536-2.022a1.867 1.867 0 0 1 2.28.28L8 13"></path>
                                </g>
                              </svg>{" "}
                              Switch Type
                            </DropdownToggle>
                            <DropdownMenu
                              style={{ marginLeft: "13em", marginTop: "-2em" }}
                            >
                              <DropdownItem>
                                Action <br />
                                Item
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>

                        <li style={{ marginTop: "1em" }}>
                          <UncontrolledDropdown setActiveFromChild>
                            <DropdownToggle tag="a" className="nav-link" caret>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 256 256"
                                style={{ color: "#5E6C84" }}
                              >
                                <path
                                  fill="currentColor"
                                  d="M214 112v96a14 14 0 0 1-14 14H56a14 14 0 0 1-14-14v-96a14 14 0 0 1 14-14h24a6 6 0 0 1 0 12H56a2 2 0 0 0-2 2v96a2 2 0 0 0 2 2h144a2 2 0 0 0 2-2v-96a2 2 0 0 0-2-2h-24a6 6 0 0 1 0-12h24a14 14 0 0 1 14 14ZM92.24 68.24L122 38.49V136a6 6 0 0 0 12 0V38.49l29.76 29.75a6 6 0 1 0 8.48-8.48l-40-40a6 6 0 0 0-8.48 0l-40 40a6 6 0 1 0 8.48 8.48Z"
                                ></path>
                              </svg>{" "}
                              Export
                            </DropdownToggle>
                            <DropdownMenu
                              style={{ marginLeft: "13em", marginTop: "-5em" }}
                            >
                              <DropdownItem>
                                Export to <br />
                                Jira <span className="upgrade">UPGRADE</span>
                              </DropdownItem>
                              <DropdownItem>
                                Export to <br />
                                Jira <span className="upgrade">UPGRADE</span>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                        <li style={{ marginTop: "1em" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M5.079 5.069c3.795-3.79 9.965-3.75 13.783.069c3.82 3.82 3.86 9.993.064 13.788c-3.795 3.795-9.968 3.756-13.788-.064a9.812 9.812 0 0 1-2.798-8.28a.75.75 0 1 1 1.487.203a8.312 8.312 0 0 0 2.371 7.017c3.245 3.244 8.468 3.263 11.668.064c3.199-3.2 3.18-8.423-.064-11.668c-3.243-3.242-8.463-3.263-11.663-.068l.748.003a.75.75 0 1 1-.007 1.5l-2.546-.012a.75.75 0 0 1-.746-.747L3.575 4.33a.75.75 0 1 1 1.5-.008l.004.748Zm6.92 2.18a.75.75 0 0 1 .75.75v3.69l2.281 2.28a.75.75 0 1 1-1.06 1.061l-2.72-2.72V8a.75.75 0 0 1 .75-.75Z"
                              clipRule="evenodd"
                            ></path>
                          </svg>{" "}
                          See history
                        </li>
                        <li
                          style={{ marginTop: "1em" }}
                          onClick={this.startEditing}
                        >
                          <svg
                            style={{ color: "red", fontWeight: "bold" }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z"
                            ></path>
                          </svg>{" "}
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Draggable>
      );
    } else {
      return (
        <CardEditor
          text={card?.text}
          onSave={this.editCard}
          onDelete={this.deleteCard}
          onCancel={this.endEditing}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId],
});

export default connect(mapStateToProps)(Card);

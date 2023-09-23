import "../styles/Card.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-responsive-modal";
import { Draggable } from "react-beautiful-dnd";
import CardEditor from "./CardEditor";
import { toast } from 'react-toastify';
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
    hoverThumb1: false,
    hoverName: false,
    color: "white",
    vote: false,
    isOpen: true,
    export: false,
    loading: false,
    moveCard: false,
    history:false
  };


  dropdownRef = React.createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleClickOutside = (event) => {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
      this.setState({
        toggleCardMenu: false,
      });
    }
  };

  // toggleCardMenu = () => {
  //   document.addEventListener("click", this.toggleCardMenu);
  // };
  handleMouseEnter = () => {
    this.setState({ hoverName: true });
  };

  handleVote = () => {
    this.setState({ vote: true })
  }
  handleMouseLeave = () => {
    this.setState({ hoverName: false });
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

  onClickMoveCard = (e) => {
    e.preventDefault();
    this.setState({ moveCard: true });
  };

  onCloseMoveCard = () => {
    this.setState({ moveCard: false });
  };

  onClickExport = (e) => {
    e.preventDefault();
    this.setState({ export: true });
  };

  onCloseExport = () => {
    this.setState({ export: false });
  };
  onClickHistory = (e) => {
    e.preventDefault();
    this.setState({ history: true });
  };

  onCloseHistory = () => {
    this.setState({ history: false });
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
    toast.success('Success! Card updated successfully!'
    , {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  deleteCard = async () => {
    const { listId, card, dispatch } = this.props;
    console.log(listId, "listId");
    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId },
    });
    toast.success('Success! Card removed successfully!'
    , {
      position: toast.POSITION.BOTTOM_RIGHT,
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
      toast.success('Success! Comment added successfully...!'
      , {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  render() {
    const { card, index, toggleMove, randomGif } = this.props;
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
              <p
                style={{ backgroundColor: this.state.color, padding: "1em" }}
              >
                {card?.text}
              </p>
              <hr style={{ marginBottom: "2em", marginTop: "-1em" }} />
              <div className="lists__menu">
                <div className="flex">
                  <div className="flex-start">
                    <div className="">anusha L.</div>

                    <i
                      className="fa fa-comment"
                      style={{ color: "#0000FF" }}
                      onClick={this.onClickButton}
                    ></i>

                    {this.state.list.length > 0 && <p style={{ marginTop: "1em" }}>{this.state.list.length}</p>}
                    <div>
                      <Modal
                        open={this.state.openModal}
                        onClose={this.onCloseModal}
                      >
                        <p className="m-4">{card?.text}</p>
                        <hr />
                        {this.state.list.map((item, index) => {
                          return (
                            <div key={index} className="flex" style={{ marginTop: "1em" }}>
                              <div></div>
                              <div
                                variant="dark"
                                action
                                style={{
                                  backgroundColor: "#0000FF",
                                  paddingLeft: "1em",
                                  paddingRight: "1em",
                                  color: "white", borderRadius: "5px"
                                }}
                              >
                                {item.value}
                                <p style={{ fontSize: "80%" }}>anusha l</p>
                              </div>
                            </div>
                          );
                        })}
                        <div className="flex width">
                          <input
                            type="text"
                            className="comment"
                            placeholder="Add Comment..."
                            value={this.state.userInput}
                            onChange={(e) => this.updateInput(e)}

                          />

                          <i class='fa fa-send' style={{ color: "blue", cursor: "pointer" }} onClick={() => this.addItem()}></i>

                        </div>
                      </Modal>
                    </div>
                  </div>
                  <div>
                    {this.state.thumb ? (
                      <>
                        {/* {this.state.hoverName && (
                          <p className="lists__menu_thumb" onClick={this.handleVote}><i class="fa fa-eye" aria-hidden="true"></i> Show Voters</p>
                         )} */}


                        {this.state.vote ?
                          <>
                            <div>
                              {this.state.isOpen && (
                                <div className="lists__menu_thumb1">
                                  <p onClick={this.handleClose} style={{ textAlign: "right" }}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"></path></svg></p>
                                  <p style={{ color: "white", fontWeight: "bold", textAlign: "center" }}><svg
                                    onMouseEnter={this.handleMouseEnter}
                                    onMouseLeave={this.handleMouseLeave}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    onClick={() => this.setState({ thumb: false })}

                                  >
                                    <path
                                      fill="currentColor"
                                      d="M18 21H8V8l7-7l1.25 1.25q.175.175.288.475t.112.575v.35L15.55 8H21q.8 0 1.4.6T23 10v2q0 .175-.037.375t-.113.375l-3 7.05q-.225.5-.75.85T18 21ZM6 8v13H2V8h4Z"
                                    ></path>
                                  </svg> <span style={{ fontWeight: "bold" }}>1 Vote</span></p>
                                  <p className=""><svg
                                    onMouseEnter={this.handleMouseEnter}
                                    onMouseLeave={this.handleMouseLeave}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    onClick={() => this.setState({ thumb: false })}
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M18 21H8V8l7-7l1.25 1.25q.175.175.288.475t.112.575v.35L15.55 8H21q.8 0 1.4.6T23 10v2q0 .175-.037.375t-.113.375l-3 7.05q-.225.5-.75.85T18 21ZM6 8v13H2V8h4Z"
                                    ></path>
                                  </svg> anusha lakkakula</p>

                                </div>
                              )}
                            </div>

                          </>
                          :
                          <p className="lists__menu_thumb" onClick={() => this.setState({ vote: true })}><i class="fa fa-eye" aria-hidden="true"></i> Show Voters</p>
                        }

                        <svg
                          onMouseEnter={this.handleMouseEnter}
                          onMouseLeave={this.handleMouseLeave}
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
                          className="lists__menu"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          onMouseEnter={() =>
                            this.setState({ hoverThumb: true })
                          }
                          onMouseLeave={() =>
                            this.setState({ hoverThumb: false })
                          }
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
                        {this.state.hoverName && (
                          <p className="lists__menu_thumb">anusha L.</p>
                        )}
                        <svg
                          onMouseEnter={this.handleMouseEnter}
                          onMouseLeave={this.handleMouseLeave}
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
                        <span style={{ color: "#0000FF" }}>1</span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 32 32"
                          onMouseEnter={() =>
                            this.setState({ hoverThumb1: true })
                          }
                          onMouseLeave={() =>
                            this.setState({ hoverThumb1: false })
                          }
                          style={{
                            color: hoverThumb1 ? "#0000FF" : "#c4c4ff",
                            marginLeft: "4px",
                          }}
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
                    <div className="lists__menu-dropdown3" ref={this.dropdownRef}>
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
                        <li style={{ marginTop: "1em" }} onClick={this.onClickMoveCard}>
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

                        <li style={{ marginTop: "1em" }} onClick={() => { }}>
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
                              <DropdownItem onClick={this.onClickExport}>
                                Export to <br />
                                Jira <span className="upgrade">UPGRADE</span>
                              </DropdownItem>
                              <DropdownItem onClick={this.onClickExport}>
                                Export to <br />
                                Azure <span className="upgrade">UPGRADE</span>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                        <li style={{ marginTop: "1em" }} onClick={this.onClickHistory}>
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
                          onClick={this.deleteCard}
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
                      <div style={{ marginLeft: "2em", marginBottom: "1em" }}>
                        <hr style={{ marginTop: "1em", marginBottom: "1em" }} />
                        <span
                          style={{
                            backgroundColor: "#e8f0fd",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                          }}
                          onClick={() => 
                            {
                              this.setState({ color: "#e8f0fd" })
                              toast.success('Success! Card updated successfully!'
                              , {
                                position: toast.POSITION.BOTTOM_RIGHT,
                              });
                          }
                          }
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#f2f2fe",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                          onClick={() => {
                            this.setState({ color: "#f2f2fe" })
                            toast.success('Success! Card updated successfully!'
                            , {
                              position: toast.POSITION.BOTTOM_RIGHT,
                            });
                          }}
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#f1f9e6",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}

                          onClick={() => 
                            {
                            this.setState({ color: "#f1f9e6" })
                            toast.success('Success! Card updated successfully!'
                            , {
                              position: toast.POSITION.BOTTOM_RIGHT,
                            });
                            }
                          }
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#fcf1e3",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                          onClick={() => 
                            {
                            this.setState({ color: "#fcf1e3" })
                            toast.success('Success! Card updated successfully!'
                            , {
                              position: toast.POSITION.BOTTOM_RIGHT,
                            });
                            }
                          }
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#fdf3f1",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                          onClick={() => 
                            {
                            this.setState({ color: "#fdf3f1" })
                            toast.success('Success! Card updated successfully!'
                            , {
                              position: toast.POSITION.BOTTOM_RIGHT,
                            });
                            }
                          }

                        ></span>
                        <span
                          style={{
                            backgroundColor: "#f8e9e6",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                          onClick={() => 
                            {
                            this.setState({ color: "#f8e9e6" })
                            toast.success('Success! Card updated successfully!'
                            , {
                              position: toast.POSITION.BOTTOM_RIGHT,
                            });
                            }
                          }
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#dedef1",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                          onClick={() => 
                            {
                            this.setState({ color: "#dedef1" })
                            toast.success('Success! Card updated successfully!'
                            , {
                              position: toast.POSITION.BOTTOM_RIGHT,
                            });
                            }
                          }
                        ></span>
                      </div>
                    </div>
                  )}
                   <Modal
                          open={this.state.moveCard}
                          onClose={this.onCloseMoveCard}
                        >
                          <div>
                            <h3 className="moveHead">Move Cards</h3>
                            <p className="movePara">Run retrospectives even when you are sleeping</p>
                            <p className="movePara"><span style={{backgroundColor:"#f2c94c", color:"white", borderRadius:"5px", padding:"0.3em"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 7v2h2V7h-2m3 10v-2h-1v-4h-3v2h1v2h-1v2h4m8-5c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-2 0c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8Z"></path></svg> This feature is not available in Free plan. Please upgrade to any plan.</span></p>

                            <p className="subPara">There is always something you want to move across boards or teams, guess what? “Move cards” <br />feature will allow you to do that. You can move any card on the board from one board to another <br />board or team</p>
                          <br/>
                          <h5>Key features:</h5>
                          <p className="subPara">- Admins can move any card on a board to any other Reetro board in your team or across <br/>multiple teams</p>
                         <div style={{textAlign:"center"}}>
                          <button style={{border:"none"}}><span style={{backgroundColor:"#0000FF", color:"white", borderRadius:"5px", padding:"0.3em"}}>Upgrade</span></button>
                          </div>
                          </div>
                        </Modal>

                        <Modal
                          open={this.state.export}
                          onClose={this.onCloseExport}
                        >
                          <div>
                            <h3 className="moveHead">Integrations</h3>
                            <p className="movePara">Seamless single click integrations with your favorite Agile tools</p>
                            <p className="movePara"><span style={{backgroundColor:"#f2c94c", color:"white", borderRadius:"5px", padding:"0.3em"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 7v2h2V7h-2m3 10v-2h-1v-4h-3v2h1v2h-1v2h4m8-5c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-2 0c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8Z"></path></svg> This feature is not available in Free plan. Please upgrade to any plan.</span></p>

                            <p className="subPara">Reetro integrates with popular tools like Atlassian Jira, AzureDevops and Confluence, Trello, Teams and Slack You can export cards and action items as user stories in your Jira project with a single click</p>
                          <br/>
                          <p className="subPara">Simply click on an action item and choose “Export to Jira” and boom your comment card or action item is created as a Task in your Jira project</p>
                          <br/>
                          <h5>Key features:</h5>
                          <p className="subPara">- Admin can configure API integration with JIRA for a single team or whole organization</p>
<p className="subPara">- Admin can configure API integration with Azure DevOps</p>
<p className="subPara">- Export Comment cards or Action items as (Task, subTask, bug or issue) in JIRA or Azure Devops</p>
<p className="subPara">- Push team notifications to your Slack channel or Microsoft Teams</p>
<p className="subPara">- Send Polls, surveys and health checks to Microsoft Teams or Slack</p>
<p className="subPara">- Export all the retrospective data from Reetro to your Confluence page</p>
<p className="subPara">- Export all the retrospective data from Reetro to Trello</p>
<br/>
<h5>Availability:</h5>
<br/>
<p className="subPara">- Set up by: Only Admin and Super Admin in the team can configure the integration but all other users can export any comment or action item to Jira or Azure DevOps</p>
                         <div style={{textAlign:"center"}}>
                          <button style={{border:"none"}}><span style={{backgroundColor:"#0000FF", color:"white", borderRadius:"5px", padding:"0.3em"}}>Upgrade</span></button>
                          </div>
                          </div>
                        </Modal>

                        <Modal
                          open={this.state.history}
                          onClose={this.onCloseHistory}
                        >
                          <div>
                            <h3 className="moveHead">Show History</h3>
                            <p className="movePara">Dig deep into the history of each card</p>
                            <p className="movePara"><span style={{backgroundColor:"#f2c94c", color:"white", borderRadius:"5px", padding:"0.3em"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 7v2h2V7h-2m3 10v-2h-1v-4h-3v2h1v2h-1v2h4m8-5c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-2 0c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8Z"></path></svg> This feature is not available in Free plan. Please upgrade to any plan.</span></p>

                            <p className="subPara">Show history feature will allow the admins to get a complete overview of all the edits and changes dones on an individual card</p>
                          <br/>
                          <h5>Key features:</h5>
                          <p className="subPara">- Admins can click on “Show history” on each card and it will show the details of the card history</p>

                       <div style={{textAlign:"center"}}>
                          <button style={{border:"none"}}><span style={{backgroundColor:"#0000FF", color:"white", borderRadius:"5px", padding:"0.3em"}}>Upgrade</span></button>
                          </div>
                          </div>
                        </Modal>
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

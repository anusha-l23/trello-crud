import "../styles/List.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
//import { getAllCards } from "../api/cards";
import Card from "./Card";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";
import shortid from "shortid";

class List extends Component {
  state = {
    editingTitle: false,
    title: this.props.list.title,
    addingCard: false,
    cards: [],
    card: "",
    toggleMenu: false,
    toggleMove: false,
    toggleCard: false,
    toggleCardTemp: false,
    togglePlus: false,
  };

  toggleAddingCard = () =>
    this.setState({ addingCard: !this.state.addingCard });

  toggleCardTemp = () =>
    this.setState({ toggleCardTemp: !this.state.toggleCardTemp });

  addCard = async (cardText) => {
    const { listId, dispatch } = this.props;

    this.toggleAddingCard();

    const cardId = shortid.generate();

    dispatch({
      type: "ADD_CARD",
      payload: { cardText, cardId, listId },
    });
    alert("Are you sure want to add card");
  };

  addCardTemp = async (cardText) => {
    const { listId, dispatch } = this.props;

    this.toggleCardTemp();

    const cardId = shortid.generate();

    dispatch({
      type: "ADD_CARD",
      payload: { cardText, cardId, listId },
    });
  };

  toggleEditingTitle = () =>
    this.setState({ editingTitle: !this.state.editingTitle });

  handleChangeTitle = (e) => this.setState({ title: e.target.value });

  editListTitle = async () => {
    const { listId, dispatch } = this.props;
    const { title } = this.state;

    this.toggleEditingTitle();

    dispatch({
      type: "CHANGE_LIST_TITLE",
      payload: { listId, listTitle: title },
    });
  };

  deleteList = async () => {
    const { listId, list, dispatch } = this.props;

    dispatch({
      type: "DELETE_LIST",
      payload: { listId, cards: list.cards },
    });
  };

  //   async componentDidMount() {
  //     //const {cards} = this.list.cards;

  // await getAllCards()
  //       .then((res) => {
  // console.log(res.data);
  // this.setState({cards: res.data})

  //       })
  //       .catch((error) => console.log(error));
  //   }

  //   handleAdd = async () => {
  //     //const {cards} = this.list.cards;

  // await addCard(this.card)
  //       .then((res) => {
  //         this.setState({card: this.state.card})
  //       })
  //       .catch((error) => console.log(error));
  //   }

  render() {
    const { list, index } = this.props;

    const {
      editingTitle,
      addingCard,
      title,
      toggleMove,
      toggleMenu,
      toggleCard,
      togglePlus,
    } = this.state;

    console.log(this.state.cards, "state");
    return (
      <Draggable draggableId={list._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="List"
          >
            {editingTitle ? (
              <ListEditor
                list={list}
                title={title}
                handleChangeTitle={this.handleChangeTitle}
                saveList={this.editListTitle}
                onClickOutside={this.editListTitle}
                deleteList={this.deleteList}
              />
            ) : (
              <div className="lists__menu">
                <div className="flex">
                  <div className="List-Title" onClick={this.toggleEditingTitle}>
                    {list.title}
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      style={{ color: "#0000FF" }}
                      onClick={() =>
                        this.setState({ togglePlus: !this.state.togglePlus })
                      }
                    >
                      <path
                        fill="currentColor"
                        d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                      ></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      style={{ marginLeft: "0.5em", color: "#0000FF" }}
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m11 16l-3 3m0 0l-3-3m3 3V5m5 3l3-3m0 0l3 3m-3-3v14"
                      ></path>
                    </svg>
                    <button
                      className="lists__menu-btn dots-color"
                      style={{ backgroundColor: "#dfe3e6" }}
                      onClick={() =>
                        toggleMove
                          ? this.setState({
                            toggleMove: !this.state.toggleMove,
                          })
                          : this.setState({
                            toggleMenu: !this.state.toggleMenu,
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
                  {/* {toggleMenu && (
                    <div className="lists__menu-dropdown">
                      <div className="lists__menu-title">
                        <div className="flex">
                          <p style={{ marginLeft: "4rem" }}>List actions</p>
                          <div
                            tabIndex="0"
                            onClick={() => {
                              this.setState({
                                toggleMenu: !this.state.toggleMenu,
                              });
                            }}
                          >
                            <i className="fa fa-close"></i>
                          </div>
                        </div>
                        <hr></hr>
                      </div>
                      <ul className="lists__menu-dropdown__options">
                        <li onClick={this.toggleAddingCard}>Add card...</li>
                        <li>copy list...</li>
                        <li>Move list...</li>
                        <li>Watch</li>
                      </ul>
                      <hr></hr>
                      <ul className="lists__menu-dropdown__options">
                        <li>Sort by...</li>
                      </ul>
                      <hr></hr>
                      <ul className="lists__menu-dropdown__options">
                        <li>Automation</li>
                        <li>When a card is added to the list</li>
                        <li>Every day, sort list by…</li>
                        <li>Every Monday, sort list by…</li>
                        <li>Create a rule</li>
                      </ul>
                      <hr></hr>
                      <ul className="lists__menu-dropdown__options">
                        <li>Move all cards in this list…</li>
                        <li>Archive all cards in this list…</li>
                      </ul>
                      <hr></hr>
                      <ul className="lists__menu-dropdown__options">
                        <li>Archive this list</li>
                      </ul>
                    </div>
                  )} */}
                  {this.state.toggleMenu && (
                    <div className="lists__menu-dropdown3">
                      <ul className="ul">
                        <li
                          style={{ marginTop: "1em" }}
                          onClick={this.editListTitle}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            style={{ color: "#0000FF" }}
                          >
                            <path
                              fill="currentColor"
                              d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
                            ></path>
                          </svg>{" "}
                          Edit
                        </li>
                        <li
                          style={{ marginTop: "1em" }}
                          onClick={this.deleteCard}
                        >
                          <i
                            className="fa fa-comment-o"
                            style={{ color: "#0000FF" }}
                          ></i> Convert All to Comments
                        </li>
                        <li
                          style={{ marginTop: "1em" }}
                          onClick={this.deleteCard}
                        >
                        
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" style={{ color: "#0000FF" }}><path fill="currentColor" d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z" /></svg> Convert All to Actions
                        </li>
                        <li
                          style={{ marginTop: "1em" }}
                          onClick={this.deleteList}
                        >
                          <svg
                            style={{ color: "#0000FF", fontWeight: "bold" }}
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
                          Empty Column
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
                          onClick={() => this.setState({ color: "#e8f0fd" })}
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#f2f2fe",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                          onClick={() => this.setState({ color: "#f2f2fe" })}
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#f1f9e6",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}

                          onClick={() => this.setState({ color: "#f1f9e6" })}
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#fcf1e3",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                          onClick={() => this.setState({ color: "#fcf1e3" })}
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#fdf3f1",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                          onClick={() => this.setState({ color: "#fdf3f1" })}

                        ></span>
                        <span
                          style={{
                            backgroundColor: "#f8e9e6",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                          onClick={() => this.setState({ color: "#f8e9e6" })}
                        ></span>
                        <span
                          style={{
                            backgroundColor: "#dedef1",
                            paddingLeft: "9px",
                            paddingRight: "9px",
                            borderRadius: "6px",
                            marginLeft: "0.5em",
                          }}
                          onClick={() => this.setState({ color: "#dedef1" })}
                        ></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Droppable droppableId={list._id} index={index}>
              {(provided, _snapshot) => (
                <div ref={provided.innerRef} className="Lists-Cards">
                  {!togglePlus && (
                    <CardEditor
                      onSave={this.addCard}
                      onCancel={this.toggleAddingCard}
                      adding
                    />
                  )}
                  {list.cards &&
                    list.cards.map((cardId, index) => (
                      <Card
                        key={cardId}
                        cardId={cardId}
                        index={index}
                        listId={list._id}
                      />
                    ))}

                  {provided.placeholder}

                  {/* 
                  {addingCard ? (
                    <CardEditor
                      onSave={this.addCard}
                      onCancel={this.toggleAddingCard}
                      adding
                    />
                  ) : (
                    <div className="lists__menu">
                      <div className="flex">
                        <div
                          className="Toggle-Add-Card"
                          onClick={this.toggleAddingCard}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="square"
                              strokeLinejoin="round"
                              strokeWidth="32"
                              d="M256 112v288m144-144H112"
                            ></path>
                          </svg>{" "}
                          Add a card
                        </div>
                        <button
                          className="lists__menu-btn dots-color"
                          onClick={() =>
                            toggleMove
                              ? this.setState({
                                  toggleMove: !this.state.toggleMove,
                                })
                              : this.setState({
                                  toggleCard: !this.state.toggleCard,
                                })
                          }
                        >
                          <svg
                            style={{ marginRight: "5px" }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M5 2h16v12h-2V4H5v16h8v2H3V2h2zm2 4h10v2H7V6zm10 4H7v2h10v-2zM7 14h7v2H7v-2zm13 5h3v2h-3v3h-2v-3h-3v-2h3v-3h2v3z"
                            ></path>
                          </svg>
                        </button>
                        {toggleCard && (
                          <div className="lists__menu-dropdown1">
                            <div className="lists__menu-title">
                              <div className="flex">
                                <p style={{ marginLeft: "4rem" }}>
                                  Card templates
                                </p>
                                <div
                                  tabIndex="0"
                                  onClick={() => {
                                    this.setState({
                                      toggleCard: !this.state.toggleCard,
                                    });
                                  }}
                                >
                                  <i className="fa fa-close"></i>
                                </div>
                              </div>
                              <hr></hr>
                            </div>
                            <div className="lists__menu-dropdown__options">
                              <div style={{ textAlign: "center" }}>
                                You don't have any templates. Create a template
                                to make copying cards easy.
                              </div>

                              <div
                                onClick={this.toggleAddingCard}
                                className="btn1"
                              >
                                Create a new template
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )} */}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId],
});

export default connect(mapStateToProps)(List);

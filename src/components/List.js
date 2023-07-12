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
  }

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
                  <button
                    className="lists__menu-btn dots-color"
                    style={{backgroundColor:"#dfe3e6"}}
                    onClick={() =>
                      toggleMove
                        ? this.setState({ toggleMove: !this.state.toggleMove })
                        : this.setState({ toggleMenu: !this.state.toggleMenu })
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
                  {toggleMenu && (
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
                        <li>Copt list...</li>
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
                  )}
                </div>
              </div>
            )}

            <Droppable droppableId={list._id} index={index}>
              {(provided, _snapshot) => (
                <div ref={provided.innerRef} className="Lists-Cards">
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
                  )}
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

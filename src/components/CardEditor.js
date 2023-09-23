import "../styles/CardEditor.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import React, { Component } from "react";
import EditButtons from "./EditButtons";
import giphy from "../assets/giphy.gif";
import { Picker } from 'emoji-mart';
import axios from "axios";
import 'emoji-mart/css/emoji-mart.css'
import CanvasDraw from 'react-canvas-draw';
class CardEditor extends Component {
  state = {
    text: this.props.text || "",
    isHover1: false,
    isHover2: false,
    isHover3: false,
    isHover4: false,
    isHover5: false,
    openModal: false,
    userInput: "",
    list: [],
    action: false,
    profile: false,
    name: false,
    gif: false,
    randomGif: "",
    kudos: false,
    openModalPoll: false,
    openModalDraw: false,
    isHover6: false,
    showPicker: false,
    selectedEmoji: null,
    searchQuery: '',
    searchedGif: '',
    brushColor: '#000000', // Default brush color
    brushRadius: 3, // Default brush size
    isEraser: false, // Whether the eraser is active
    brushToggle: false,
    brushColorToggle: false,
  };

  backgroundImageUrl = '../assets/color-circle.png'
  containerStyle = {
    backgroundImage: `url(${this.backgroundImageUrl})`, 
  backgroundRepeat: "no-repeat", 
  width: "25px", 
  height: "25px", 
  cursor: "pointer"
}

  brushToggle = () => {
    this.setState({
      brushToggle: true,
      brushColorToggle:false
    });
  };
  brushColorToggle = () => {
    this.setState({
      brushColorToggle: true,
      brushToggle: false,
    });
  };

  handleSaveClick = () => {
    // Access the CanvasDraw component using the ref and call the save method
    if (this.saveableCanvas.current) {
      const canvasDrawInstance = this.saveableCanvas.current;
      const canvasData = canvasDrawInstance.getSaveData();
      // You can save the `canvasData` to your server, download it, or perform any other actions.
      // Here, we'll simply log it to the console.
      console.log(canvasData,"canvas");
    }
  };

  handleColorChange = (event) => {
    this.setState({ brushColor: event.target.value });
  };

  // Handle brush size change
  handleSizeChange = (event) => {
    this.setState({ brushRadius: parseInt(event.target.value, 10) });
  };

  // Toggle eraser mode
  toggleEraser = () => {
    this.setState((prevState) => ({
      isEraser: !prevState.isEraser,
    }));
  };

  handleEmojiSelect = (emoji) => {
    const { text } = this.state;
    const newText = text + emoji.native;

    this.setState({
      text: newText,
      showEmojiPicker: false,
      selectedEmoji: null
    });
  };

  toggleEmojiPicker = () => {
    this.setState((prevState) => ({
      showPicker: !prevState.showPicker,
    }));
  };

  toggleKudos = () => {
    this.setState({ kudos: true });
  };
  toggleKudosCancel = () => {
    this.setState({ kudos: false });
  };

  toggleGif = () => {
    this.setState({ gif: true });
  };
  toggleGifCancel = () => {
    this.setState({ gif: false });
  };

  toggleName = () => {
    this.setState({ name: true });
  };

  toggleProfile = () => {
    this.setState({ profile: !this.profile });
  };
  toggleAction = () => {
    this.setState({ action: true });
  };
  toggleActionCancel = () => {
    this.setState({ action: false });
  };


  onClickButton = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  onClickPoll = (e) => {
    e.preventDefault();
    this.setState({ openModalPoll: true });
  };

  onClosePoll = () => {
    this.setState({ openModalPoll: false });
  };
  onClickDraw = (e) => {
    e.preventDefault();
    this.setState({ openModalDraw: true });
  };

  onCloseDraw = () => {
    this.setState({ openModalDraw: false });
  };
  handleChangeText = (event) => {
    this.setState({ text: event.target.value })
  };
  // handleChangeGif = () => {
  //   `${this.state.randomGif}`
  // };

  onEnter = (e) => {
    const { text } = this.state;

    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.onSave(text);
      this.setState({ text: "" })
    }
  };

  handleMouseEnter1 = () => {
    this.setState({ isHover1: true });
  };

  handleMouseLeave1 = () => {
    this.setState({ isHover1: false });
  };
  handleMouseEnter2 = () => {
    this.setState({ isHover2: true });
  };

  handleMouseLeave2 = () => {
    this.setState({ isHover2: false });
  };
  handleMouseEnter3 = () => {
    this.setState({ isHover3: true });
  };

  handleMouseLeave3 = () => {
    this.setState({ isHover3: false });
  };
  handleMouseEnter4 = () => {
    this.setState({ isHover4: true });
  };

  handleMouseLeave4 = () => {
    this.setState({ isHover4: false });
  };
  handleMouseEnter5 = () => {
    this.setState({ isHover5: true });
  };

  handleMouseLeave5 = () => {
    this.setState({ isHover5: false });
  };

  handleGif = () => {
    axios
      .get(`https://api.giphy.com/v1/gifs/random?api_key=HNBQ1lw4HS820hCCOn5Z6HB1cap7q18W`)
      .then((response) => {
        this.setState((prevState) => ({
          text: `${prevState.text} ${response.data.data.images.fixed_height.url}`,
          randomGif: response.data.data.images.fixed_height.url
        }));

      })
      .catch((error) => {
        console.error('Error fetching random GIF:', error);
      });
  }

  handleGifSearch = () => {
    const { searchQuery } = this.state;
    axios
      .get(`https://api.giphy.com/v1/gifs/random?api_key=HNBQ1lw4HS820hCCOn5Z6HB1cap7q18W&q=${searchQuery}`)
      .then((response) => {
        this.setState({
          randomGif: response.data.data.images.fixed_height.url,
        });
      })
      .catch((error) => {
        console.error('Error fetching searched GIF:', error);
      });
  };

  render() {
    const {
      text,
      isHover1,
      isHover2,
      isHover3,
      isHover4,
      isHover5,
      action,
    } = this.state;
    const {
      onSave,
      onCancel,
      onDelete,
      adding,
      startEditing,
      //card,
      //editCard,
      //gif,
      toggleMove,
    } = this.props;


    return (
      <div className="Edit-Card lists__menu">
        <div className="Card">
          <p style={{ textAlign: "right", margin: "0px", color: "gray" }} onClick={this.toggleEmojiPicker}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><g fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75a.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25a.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"></path></g></svg></p>
          <input
            autoFocus
            className="Edit-Card-Textarea"
            //   placeholder="Please enter to Add Card"
            value={text}
            style={{ marginTop: "15px" }}
            onChange={this.handleChangeText}
            onKeyDown={this.onEnter}
          />

          {this.state.showPicker && (
            <div>
              <Picker onSelect={this.handleEmojiSelect} style={{ width: "100%" }} />
            </div>
          )}

          {action && !this.state.name && (
            <svg
              className="rounded-dashed"
              onClick={() =>
                toggleMove
                  ? this.setState({ toggleMove: !this.state.toggleMove })
                  : this.setState({ profile: !this.state.profile })
              }
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 5.9a2.1 2.1 0 1 1 0 4.2a2.1 2.1 0 0 1 0-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4z"
              ></path>
            </svg>
          )}
          {this.state.name && (
            <div
              className="profilename"
              onClick={() =>
                toggleMove
                  ? this.setState({ toggleMove: !this.state.toggleMove })
                  : this.setState({ profile: !this.state.profile })
              }
            >
              AL
            </div>
          )}

          {this.state.profile && (
            <div className="lists__menu-dropdown2">
              <div className="lists__menu-title1">
                <div className="flex">
                  <p>Assignee</p>
                  <div
                    tabIndex="0"
                    onClick={() => {
                      this.setState({
                        profile: !this.state.profile,
                      });
                    }}
                  >
                    <i className="fa fa-close"></i>
                  </div>
                </div>
              </div>
              <div className="lists__menu-dropdown__options">
                <div className="flex-start1">
                  <input
                    autoFocus
                    className="assignee"
                    placeholder="Search Users"
                    style={{ borderRadius: "8px" }}
                  />
                  <p>or</p>
                  <button
                    type="submit"
                    className="assignee1"
                    style={{ borderRadius: "8px" }}
                    onClick={() => this.setState({ name: !this.name })}
                  >
                    To me
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* {this.state.gif && (
            <>
              <img
                src={giphy}
                width="50%"
                className="center"
                alt=""
              />
              <div className="flex">
                <input
                  type="text"
                  placeHolder="Search GIF ..."
                  className="borderbottom"
                />
                <button className="bluebutton">Shuffle</button>
              </div>
            </>
          )} */}
          {this.state.randomGif && (
            <>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <img src={this.state.randomGif} alt="Random GIF" style={{ width: "70%" }} />
                {/* {this.state.searchedGif && <img src={this.state.searchedGif} alt="Random GIF" style={{width:"70%", marginTop:"6px"}}/>}
           */}
              </div>
              <div className="d-flex mt-4 text-center p-2 gap-4">
                <input
                  type="text"
                  style={{ border: "none", borderBottom: "1px solid gray", width: "60%", fontSize: "90%", outline: "none" }}
                  placeholder="Search GIF..."
                  value={this.state.searchQuery}
                  onChange={(e) => this.setState({ searchQuery: e.target.value })}
                />
                <button onClick={this.handleGifSearch} style={{ border: "1px solid blue", borderRadius: "10px", fontSize: "90%", color: "blue", padding: "0.5em" }}>Shuffle</button>
              </div>
            </>
          )}

          {this.state.kudos && (
            <div className="flex-start" style={{ marginTop: "0.5em" }}>
              <svg
                className="rounded-dashed1"
                onClick={() =>
                  toggleMove
                    ? this.setState({ toggleMove: !this.state.toggleMove })
                    : this.setState({ profile: !this.state.profile })
                }
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 5.9a2.1 2.1 0 1 1 0 4.2a2.1 2.1 0 0 1 0-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4z"
                ></path>
              </svg>
              <select name="kudos" id="kudos" className="select">
                <option value="volvo">Great Job</option>
                <option value="saab">Congratulations</option>
                <option value="mercedes">Totally Awesome</option>
                <option value="audi">Thanku You</option>
                <option value="audi">Well Done</option>
              </select>
            </div>
          )}
          <hr style={{ marginTop: "1em", marginBottom: "2em" }} />
          {adding ? (
            <div className="flex-start">
              <i
                className="fa fa-comment-o"
                style={{ color: "#0000FF" }}
                onClick={(e) => {
                  this.toggleActionCancel();
                  this.toggleGifCancel();
                  this.toggleKudosCancel();
                }}
              ></i>
              <i
                onMouseEnter={this.handleMouseEnter1}
                onMouseLeave={this.handleMouseLeave1}
                className="fa fa-hand-o-up"
                aria-hidden="true"
                style={{ color: isHover1 ? "#0000FF" : "#c4c4ff" }}
                onClick={this.toggleAction}
              ></i>
              <svg
                onMouseEnter={this.handleMouseEnter2}
                onMouseLeave={this.handleMouseLeave2}
                style={{ color: isHover2 ? "#0000FF" : "#c4c4ff" }}
                // onClick={this.toggleGif}
                onClick={this.handleGif}
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 8H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3v-4H7m5-4v8m4 0V8h5m-1 4h-4"
                ></path>
              </svg>
              <svg
                onMouseEnter={this.handleMouseEnter3}
                onMouseLeave={this.handleMouseLeave3}
                style={{ color: isHover3 ? "#0000FF" : "#c4c4ff" }}
                onClick={this.toggleKudos}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
              >
                <g fill="currentColor">
                  <path d="M15.371 13.041c.111.037.226.064.342.081c.185.047.373.08.563.1a1.978 1.978 0 0 0 3.846.114c.218-.786.33-1.598.333-2.414a9.441 9.441 0 0 0 1.168-2.1l.013-.03l.107-.26l.137-.346a28.99 28.99 0 0 0 .415-1.146l.027-.08l.01-.032c.068-.2.136-.422.2-.646c.038-.129.074-.26.109-.392a9.501 9.501 0 0 0 .322-1.791v-.03a2 2 0 0 0-1.732-2.052a1.96 1.96 0 0 0-1.134.195a2 2 0 0 0-1.091 1.636v.01a8.502 8.502 0 0 1-.43 1.793c-.1.3-.2.585-.3.84c-.2-.103-.41-.19-.624-.26l-.019-.009a3.592 3.592 0 0 0-2.262 6.818v.001Zm3.786.031a.978.978 0 0 1-1.849.117c.19-.034.377-.082.559-.144a4.434 4.434 0 0 0 1.489-.89c-.05.31-.116.615-.199.917Zm-5.11-4.26a2.586 2.586 0 0 1 3.27-1.64l.03.01c.195.062.383.144.561.244l-.021.049v.012a5.428 5.428 0 0 1-.9 1.429l-.016.016l-.025.029a1.88 1.88 0 0 1-.1.109a2.193 2.193 0 0 0-.1-.038l-.03-.01a.634.634 0 0 0-.8.4a.575.575 0 0 0 .03.48c.06.128.162.231.289.292c.034.008.067.017.1.028c.09.032.184.053.279.061a.8.8 0 0 0 .437-.1c.07-.036.137-.077.2-.124c.168-.132.322-.28.458-.445l.01-.01a6.325 6.325 0 0 0 1.077-1.693a4.624 4.624 0 0 0 .088-.215a.03.03 0 0 0 0-.015l.01-.024a16.897 16.897 0 0 0 .162-.393l.034-.087l.034-.088c.424-1.015.72-2.079.883-3.167a.999.999 0 0 1 .333-.674a.979.979 0 0 1 .707-.246c.215.012.42.096.58.24a1 1 0 0 1 .34.79c-.01.159-.029.327-.055.5c-.08.492-.192.98-.336 1.457l-.042.14a23.581 23.581 0 0 1-.615 1.764l-.033.084a24.263 24.263 0 0 1-.174.429l-.015.036l-.086.208a8.517 8.517 0 0 1-1.414 2.24a3.736 3.736 0 0 1-1.831 1.26a2.68 2.68 0 0 1-1.043.072a2.942 2.942 0 0 1-.422-.084a.905.905 0 0 1-.214-.045a2.593 2.593 0 0 1-1.64-3.281ZM12.06 3.98a.96.96 0 1 1-1.066-1.596a.96.96 0 0 1 1.066 1.596Zm11.908 18.846a.97.97 0 1 1 1.078 1.612a.97.97 0 0 1-1.078-1.612Zm.999-13.914a1.16 1.16 0 1 0 0-2.32a1.16 1.16 0 0 0 0 2.32ZM6.651 8.716a1.16 1.16 0 1 1-1.288-1.929a1.16 1.16 0 0 1 1.288 1.93Z"></path>
                  <path d="M29.396 14.89a1.044 1.044 0 0 1-.799.032a6.646 6.646 0 0 0-6.397.969c2.327.06 4.602.694 6.623 1.849a2.15 2.15 0 0 1-2.086 3.76a9.742 9.742 0 0 0-7.981-.813c.335.643.586 1.327.745 2.035c.057.211.085.43.084.648a1.963 1.963 0 0 1-.48 1.542c-.08.08-.169.15-.265.209a2.4 2.4 0 0 1-1.055.591l-12.738 3.41a2.42 2.42 0 0 1-2.96-2.97l3.41-12.74a2.4 2.4 0 0 1 .6-1.065a1.45 1.45 0 0 1 .2-.255a1.938 1.938 0 0 1 1.495-.482c.243-.006.486.025.72.092a8.05 8.05 0 0 1 1.794.636c.28-1.62.01-3.288-.769-4.736a1.174 1.174 0 0 1 2.07-1.11a9.715 9.715 0 0 1 .824 7.11a21.066 21.066 0 0 1 2.209 1.805a1.15 1.15 0 0 1 1.677 1.573a16.103 16.103 0 0 1 4.522-1.051a1.05 1.05 0 0 1 .004-1.641a8.74 8.74 0 0 1 8.486-1.33a1.048 1.048 0 0 1 .067 1.932Zm-17.888 7.357l-.181-.155l.166.142l.015.012Zm0 0l.132.112a13.258 13.258 0 0 0-.132-.113Zm-7.454 5.908c.24.065.494.065.735.001l.578-.151a11.293 11.293 0 0 1-2.183-2.08l-.131.49a1.419 1.419 0 0 0 1.001 1.74Zm1.596-2.507a10.26 10.26 0 0 0 2.379 1.641l2.798-.749a17.513 17.513 0 0 1-3.03-2.265a19.225 19.225 0 0 1-3.142-3.853l-.794 2.969a10.149 10.149 0 0 0 1.789 2.257Zm3.517-2.835a16.3 16.3 0 0 0 4.53 2.96l2.491-.668a16.71 16.71 0 0 1-6.011-4.073a22.352 22.352 0 0 1-1.664-1.85c-.23-.285-.444-.57-.644-.853a12.932 12.932 0 0 1-1.772-3.307l-.703 2.661a18.654 18.654 0 0 0 3.773 5.13Zm19.534-3.91a1.15 1.15 0 0 0-.356-.288h-.005a13.151 13.151 0 0 0-11.255-.857l-.192.07l.009.01a13.12 13.12 0 0 0-4.94 3.476c.259.227.51.435.759.635c.349.28.7.539 1.1.8a10.151 10.151 0 0 1 4.028-2.82a10.86 10.86 0 0 1 9.375.693a1.15 1.15 0 0 0 1.477-1.72Z"></path>
                </g>
              </svg>

              <svg
                onMouseEnter={this.handleMouseEnter4}
                onMouseLeave={this.handleMouseLeave4}
                style={{ color: isHover4 ? "#0000FF" : "#c4c4ff" }}
                onClick={this.onClickPoll}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8 17c-.55 0-1-.45-1-1v-5c0-.55.45-1 1-1s1 .45 1 1v5c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v8c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1z"
                ></path>
              </svg>
              <Modal open={this.state.openModalPoll} onClose={this.onClosePoll}>
                <h3 className="text-center">Create new poll</h3>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="free">free</div>
                      <img
                        className="img-main center"
                        width="50%"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt="Create your own template"
                      />
                      <p className="text-center">Create your own template</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="pro">pro</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt="What's your Happiness index?"
                      />
                      <p className="text-center">
                        What's your Happiness index?
                      </p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="free">free</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt="What's your Energy Level?"
                      />
                      <p className="text-center">What's your Energy Level?</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="free">free</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt="The Sprint Weather Report"
                      />
                      <p className="text-center">The Sprint Weather Report</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="pro">pro</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt=""
                      />
                      <p className="text-center">Rate your Sprint</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="free">free</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt=""
                      />
                      <p className="text-center">Pick a Picture</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="free">free</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt="Rate Your Scrum Master"
                      />
                      <p className="text-center">Rate Your Scrum Master</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="card-poll">
                      <div className="free">free</div>
                      <img
                        className="img-main center"
                        src="https://www.aclu-ia.org/sites/default/files/styles/featured_image_580x386/public/field_image/woman_voting_1.jpg?itok=zQrrA5KG"
                        alt="One Word"
                      />
                      <p className="text-center">One Word</p>

                      <button className="btn-primary">Select Template</button>
                    </div>
                  </div>
                </div>
              </Modal>
              <svg
                onMouseEnter={this.handleMouseEnter5}
                onMouseLeave={this.handleMouseLeave5}
                style={{ color: isHover5 ? "#0000FF" : "#c4c4ff" }}
                onClick={this.onClickDraw}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 22q-2.05 0-3.875-.788t-3.188-2.15q-1.362-1.362-2.15-3.187T2 12q0-2.075.813-3.9t2.2-3.175Q6.4 3.575 8.25 2.788T12.2 2q2 0 3.775.688t3.113 1.9q1.337 1.212 2.125 2.875T22 11.05q0 2.875-1.75 4.413T16 17h-1.85q-.225 0-.313.125t-.087.275q0 .3.375.863t.375 1.287q0 1.25-.688 1.85T12 22Zm0-10Zm-5.5 1q.65 0 1.075-.425T8 11.5q0-.65-.425-1.075T6.5 10q-.65 0-1.075.425T5 11.5q0 .65.425 1.075T6.5 13Zm3-4q.65 0 1.075-.425T11 7.5q0-.65-.425-1.075T9.5 6q-.65 0-1.075.425T8 7.5q0 .65.425 1.075T9.5 9Zm5 0q.65 0 1.075-.425T16 7.5q0-.65-.425-1.075T14.5 6q-.65 0-1.075.425T13 7.5q0 .65.425 1.075T14.5 9Zm3 4q.65 0 1.075-.425T19 11.5q0-.65-.425-1.075T17.5 10q-.65 0-1.075.425T16 11.5q0 .65.425 1.075T17.5 13ZM12 20q.225 0 .363-.125t.137-.325q0-.35-.375-.825T11.75 17.3q0-1.05.725-1.675T14.25 15H16q1.65 0 2.825-.963T20 11.05q0-3.025-2.313-5.038T12.2 4Q8.8 4 6.4 6.325T4 12q0 3.325 2.337 5.663T12 20Z"
                ></path>
              </svg>
              <Modal open={this.state.openModalDraw} onClose={this.onCloseDraw}>
                <h3 className="text-center">Draw your feelings</h3>

                {/* <div>

                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={this.state.brushRadius}
                    onChange={this.handleSizeChange}
                  />

                  <input
                    type="color"
                    value={this.state.brushColor}
                    onChange={this.handleColorChange}
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                    style={{
                      color: "#273081",
                      fontWeight: "bold",
                      marginLeft: "4em",
                    }}
                    onClick={() => this.saveableCanvas.clear()}
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 20H8.5l-4.21-4.3a1 1 0 0 1 0-1.41l10-10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41L11.5 20m6.5-6.7L11.7 7"
                    ></path>
                  </svg>
                  <svg
                    style={{ color: "#273081" }}
                    onClick={() => this.saveableCanvas.undo()}
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5.34 4.468h2v2.557a7 7 0 1 1-1.037 10.011l1.619-1.185a5 5 0 1 0 .826-7.384h2.591v2h-6v-6Z"
                    ></path>
                  </svg>

                </div> */}

                <div className="canvas_container__ElvIb">
                  <div className="canvas_toolBar__ikVUr">
                    <div className="canvas_item__ptBji">
                      <div className="tooltip_tooltipContainer__s90Dd">
                        <div className="tooltip_tooltipText__1VgGi tooltip_tooltipBottomCenter__byOdK">Brush Size</div>
                        <svg onClick={this.brushToggle} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 21q-1.125 0-2.225-.55T2 19q.65 0 1.325-.513T4 17q0-1.25.875-2.125T7 14q1.25 0 2.125.875T10 17q0 1.65-1.175 2.825T6 21Zm5.75-6L9 12.25l8.95-8.95q.275-.275.688-.288t.712.288l1.35 1.35q.3.3.3.7t-.3.7L11.75 15Z"></path></svg>
                      </div>
                    </div>
                    <div className="canvas_line__ycrH4"></div>
                    <div className="canvas_item__ptBji">
                      <div className="tooltip_tooltipContainer__s90Dd">
                        <div className="tooltip_tooltipText__1VgGi tooltip_tooltipBottomCenter__byOdK">Brush Color</div>
                        <svg style={{borderBottom:`4px solid ${this.state.brushColor}`}} onClick={this.brushColorToggle} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256"><path fill="currentColor" d="M224.49 76.2L179.8 31.51a12 12 0 0 0-17 0L39.51 154.83a12 12 0 0 0-3.51 8.48V208a12 12 0 0 0 12 12h44.69a11.93 11.93 0 0 0 8.48-3.51l88.67-88.67l5.73 23l-38.39 38.4a4 4 0 1 0 5.65 5.66l40-40a4 4 0 0 0 1.06-3.8l-7.46-29.8l28.06-28.06a12 12 0 0 0 0-17.02ZM44 208v-38.34L86.35 212H48a4 4 0 0 1-4-4Zm52 2.34L45.66 160L136 69.66L186.35 120ZM218.83 87.51L192 114.34L141.66 64l26.83-26.83a4 4 0 0 1 5.66 0l44.68 44.69a4 4 0 0 1 0 5.65Z"></path></svg>
                      </div></div>
                    <div className="canvas_line__ycrH4"></div>
                    <div className="canvas_item__ptBji">
                      <div className="tooltip_tooltipContainer__s90Dd">
                        <div className="tooltip_tooltipText__1VgGi tooltip_tooltipBottomCenter__byOdK">Eraser</div>
                        <svg  onClick={() => this.saveableCanvas.clear()} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="m5.505 11.41l.53.53l-.53-.53ZM3 14.952h-.75H3ZM9.048 21v.75V21ZM11.41 5.505l-.53-.53l.53.53Zm1.831 12.34a.75.75 0 0 0 1.06-1.061l-1.06 1.06ZM7.216 9.697a.75.75 0 1 0-1.06 1.061l1.06-1.06Zm10.749 2.362l-5.905 5.905l1.06 1.06l5.905-5.904l-1.06-1.06Zm-11.93-.12l5.905-5.905l-1.06-1.06l-5.905 5.904l1.06 1.06Zm0 6.025c-.85-.85-1.433-1.436-1.812-1.933c-.367-.481-.473-.79-.473-1.08h-1.5c0 .749.312 1.375.78 1.99c.455.596 1.125 1.263 1.945 2.083l1.06-1.06Zm-1.06-7.086c-.82.82-1.49 1.488-1.945 2.084c-.468.614-.78 1.24-.78 1.99h1.5c0-.29.106-.6.473-1.08c.38-.498.962-1.083 1.812-1.933l-1.06-1.06Zm7.085 7.086c-.85.85-1.435 1.433-1.933 1.813c-.48.366-.79.472-1.08.472v1.5c.75 0 1.376-.312 1.99-.78c.596-.455 1.264-1.125 2.084-1.945l-1.06-1.06Zm-7.085 1.06c.82.82 1.487 1.49 2.084 1.945c.614.468 1.24.78 1.989.78v-1.5c-.29 0-.599-.106-1.08-.473c-.497-.38-1.083-.962-1.933-1.812l-1.06 1.06Zm12.99-12.99c.85.85 1.433 1.436 1.813 1.933c.366.481.472.79.472 1.08h1.5c0-.749-.312-1.375-.78-1.99c-.455-.596-1.125-1.263-1.945-2.083l-1.06 1.06Zm1.06 7.086c.82-.82 1.49-1.488 1.945-2.084c.468-.614.78-1.24.78-1.99h-1.5c0 .29-.106.6-.473 1.08c-.38.498-.962 1.083-1.812 1.933l1.06 1.06Zm0-8.146c-.82-.82-1.487-1.49-2.084-1.945c-.614-.468-1.24-.78-1.989-.78v1.5c.29 0 .599.106 1.08.473c.497.38 1.083.962 1.933 1.812l1.06-1.06Zm-7.085 1.06c.85-.85 1.435-1.433 1.933-1.812c.48-.367.79-.473 1.08-.473v-1.5c-.75 0-1.376.312-1.99.78c-.596.455-1.264 1.125-2.084 1.945l1.06 1.06Zm2.362 10.749L7.216 9.698l-1.06 1.061l7.085 7.085l1.06-1.06Z"></path><path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M9 21h12"></path></g></svg>
                      </div></div>
                    <div className="canvas_line__ycrH4"></div>
                    <div className="canvas_item__ptBji">
                      <div className="tooltip_tooltipContainer__s90Dd">
                        <div className="tooltip_tooltipText__1VgGi tooltip_tooltipBottomCenter__byOdK">Undo</div>
                        <svg onClick={() => this.saveableCanvas.undo()} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.34 4.468h2v2.557a7 7 0 1 1-1.037 10.011l1.619-1.185a5 5 0 1 0 .826-7.384h2.591v2h-6v-6Z"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
             
                {this.state.brushToggle && 
                <>
                  <div className="canvas_container__ElvIb1">
                  <div className="canvas_toolBar__ikVUr1">
                <h3>Brush Size</h3>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={this.state.brushRadius}
                  onChange={this.handleSizeChange}
                />
                </div>
                </div>
              
                </>
                }
{this.state.brushColorToggle && 
<>

                  {/* <h3>Color</h3>
<input
                    type="color"
                    value={this.state.brushColor}
                    onChange={this.handleColorChange}
                  /> */}
               <div class="popups_colorPickerContainer__190uR">
                <div><p>Color</p>
               <div style={{display: "flex", gap: "12px", alignItems: "center"}}>
                <div style={this.containerStyle}> 
                  <input type="color" style={{opacity: "0.3", cursor: "pointer"}} 
                      value={this.state.brushColor}
                    onChange={this.handleColorChange}/>
                    </div>
               <div class="popups_line__dMT9w"></div>
               <div class="popups_color__2gzuz" style={{background: "rgb(243, 198, 140)", border: "2px solid transparent"}}></div>
               <div class="popups_color__2gzuz" style={{background: "rgb(143, 182, 245)", border: "2px solid transparent"}}></div>
               <div class="popups_color__2gzuz" style={{background: "rgb(241, 169, 155)", border: "2px solid transparent"}}></div>
               <div class="popups_color__2gzuz" style={{background: "rgb(198, 230, 153)", border: "2px solid transparent"}}></div>
               <div class="popups_color__2gzuz" style={{background: "rgb(150, 150, 247)", border: "2px solid transparent"}}></div>
               <div class="popups_color__2gzuz" style={{background: "rgb(157, 157, 213)", border: "2px solid transparent"}}></div>
               <div class="popups_color__2gzuz" style={{background: "rgb(227, 167, 155)", border: "2px solid transparent"}}></div></div>
               <div class="popups_colorBox__LstkM"></div></div></div>
                  </>
                  }

     
                <CanvasDraw
                  ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
                  canvasWidth={700}
                  canvasHeight={500}
                  brushColor={this.state.isEraser ? '#ffffff' : this.state.brushColor}
                  brushRadius={this.state.brushRadius}
                  hideGrid
                />

                {/* <div className="pallete">
                  <div className="color" style={{ backgroundColor: "gray" }}></div>
                  <div
                    className="color"
                    style={{ backgroundColor: "orange" }}
                  ></div>

                  <div className="color" style={{ backgroundColor: "cyan" }}></div>
                  <div className="color" style={{ backgroundColor: "pink" }}></div>
                  <div className="color" style={{ backgroundColor: "green" }}></div>
                  <div className="color" style={{ backgroundColor: "blue" }}></div>
                  <div className="color" style={{ backgroundColor: "blue" }}></div>
                  <div className="color" style={{ backgroundColor: "pink" }}></div>
                </div>
                <div className="brush-thickness">
                  <div className="range-slider">
                    <input
                      className="input-range"
                      orient="vertical"
                      type="range"
                      step="1"
                      min="1"
                      max="10"
                      value="5"
                    />
                    <span className="range-value"></span>
                  </div>
                  <div className="thickness-strokes pos-rel">
                    <div className="ts-10"></div>
                    <div className="ts-9"></div>
                    <div className="ts-8"></div>
                    <div className="ts-7"></div>
                    <div className="ts-6"></div>
                    <div className="ts-5"></div>
                    <div className="ts-4"></div>
                    <div className="ts-3"></div>
                    <div className="ts-2"></div>
                    <div className="ts-1"></div>
                  </div>
                </div>
                <div
                  className="container"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    style={{
                      display: "block",
                      touchAction: "none",
                      width: "600px",
                      height: "350px",
                    }}
                  >
                    <canvas
                      width="600"
                      height="450"
                      style={{ display: "block", position: "absolute" }}
                    ></canvas>
                    <canvas
                      width="600"
                      height="450"
                      style={{ display: "block", position: "absolute" }}
                    ></canvas>
                    <canvas
                      width="600"
                      height="450"
                      style={{ display: "block", position: "absolute" }}
                    ></canvas>
                    <canvas
                      width="600"
                      height="450"
                      style={{ display: "block", position: "absolute" }}
                    ></canvas>
                  </div>
                </div>
                <div className="div">
                  <button className="btn2">save</button>
                </div> */}

<div style={{textAlign:"center"}}>
<button className="btn btn-primary" onClick={this.handleSaveClick}>Save</button>
</div>
              </Modal>
            </div>
          ) : (
            <div className="flex-start">
              <div className="">anusha L.</div>
            </div>
          )}

        </div>
        {/*  
        <EditButtons
          handleSave={() => onSave(text)}
          saveLabel={adding ? "Add card" : "Save"}
          handleDelete={onDelete}
          handleCancel={onCancel}
        />
       */}
      </div>
    );
  }
}

export default CardEditor;

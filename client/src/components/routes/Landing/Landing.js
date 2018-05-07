import React, { Component } from 'react';
import M from 'materialize-css';

/**
 * Landing page component which displays at the website's homepage '/'
 */
class Landing extends Component {
  componentDidMount() {
    //initialise materializeCSS javascript functionality
    var elem = document.querySelectorAll('.parallax');
    var instance = M.Parallax.init(elem, {});
  }

  render() {
    return (
      <div>
        <Banner />
        <TextContainer>
          <TextColumn title="Simplify organising your matches" iconName="event">
            Squad Square gives you the tools you need to organise and track
            sports events. Keep track of who has responded to your invitation on
            the website or just opt in to get email notifications about your
            event.
          </TextColumn>
          <TextColumn title="Easily invite your friends" iconName="send">
            It's as simple as adding a list of emails and clicking a button. All
            recipients will receive an email with a link to respond whether they
            can make it to the match or not. Add a minimum number of invitees
            before the event will be confirmed to prevent disappointment.
          </TextColumn>

          <TextColumn title="Notify and remind your Squad" iconName="comment">
            Let SquadSquare take care of sending reminders to everyone you
            invited when it's needed. Set up a reminder for them to respond or
            let everyone know when the match has been confirmed to go through.
          </TextColumn>
        </TextContainer>

        <ImageContainer
          imgSrc={window.location.origin + '/images/background1-football.jpg'}
          text={'Organise your sports match.'}
        />

        <TextContainer>
          <div className="col s12 center">
            <h3>
              <i className="mdi-content-send brown-text" />
            </h3>
            <h4>About SquadSquare</h4>
            <p className="left-align light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              scelerisque id nunc nec volutpat. Etiam pellentesque tristique
              arcu, non consequat magna fermentum ac. Cras ut ultricies eros.
              Maecenas eros justo, ullamcorper a sapien id, viverra ultrices
              eros. Morbi sem neque, posuere et pretium eget, bibendum
              sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis
              nisl maximus sed. Nulla imperdiet semper molestie. Morbi massa
              odio, condimentum sed ipsum ac, gravida ultrices erat. Nullam eget
              dignissim mauris, non tristique erat. Vestibulum ante ipsum primis
              in faucibus orci luctus et ultrices posuere cubilia Curae;
            </p>
          </div>
        </TextContainer>

        <ImageContainer
          imgSrc={window.location.origin + '/images/background1-football.jpg'}
          text="Invite your friends."
        />
      </div>
    );
  }
}

/**
 * Defines the structure of the top of the landing page, which displays the
 * website title and a button to join the website
 */
const Banner = () => {
  return (
    <div id="index-banner" className="parallax-container">
      <div className="section no-pad-bot">
        <div className="container">
          <h1 className="header center light-blue-text text-lighten-2">
            Squad Square
          </h1>
          <div className="row center">
            <h5 className="header col s12 light">
              The modern way of organising sports matches.
            </h5>
          </div>
          <div className="row center">
            <a
              href="/auth/google"
              id="download-button"
              className="btn-large waves-effect waves-light light-blue lighten-1"
            >
              Join Our Squad
            </a>
          </div>
        </div>
      </div>
      <div className="parallax grey darken-4">
        <img
          src={window.location.origin + '/images/background1-football.jpg'}
          alt="Background img 1"
        />
      </div>
    </div>
  );
};

/**
 * Contains images to display in between content sections with optional
 * text to display on the images
 */
const ImageContainer = props => {
  return (
    <div className="parallax-container valign-wrapper">
      <div className="section no-pad-bot">
        <div className="container">
          <div className="row center">
            <h5 className="header col s12 light">{props.text}</h5>
          </div>
        </div>
      </div>
      <div className="parallax grey darken-4">
        <img src={props.imgSrc} alt="Unsplashed background img 2" />
      </div>
    </div>
  );
};

/**
 * Container to display text on the Landing page, allows for children to be
 * passed to display the child elements within the content container
 */
const TextContainer = props => {
  return (
    <div className="container">
      <div className="section">
        <div className="row">{props.children}</div>
      </div>
    </div>
  );
};

const TextColumn = props => {
  return (
    <div className="col s12 m4">
      <div className="icon-block">
        <h2 className="center brown-text">
          <i className="material-icons">{props.iconName}</i>
        </h2>
        <h5 className="center">{props.title}</h5>
        <p className="light">{props.children}</p>
      </div>
    </div>
  );
};

export default Landing;

import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";
import blueMarker from "../assets/images/blue-marker.svg";

export class AroundMarker extends Component {
    state = {
        isOpen: false
    };

    toggleOpen = () => {
        this.setState(prevState => {
            return {
                isOpen: !prevState.isOpen
            };
        });
    };

    render() {
        const { user, message, url, location, type } = this.props.post;
        const { lat, lon: lng } = location;
        const isImage = type === "image";
        const icon = isImage
            ? undefined
            : {
                  url: blueMarker,
                  scaledSize: new window.google.maps.Size(26, 41)
              };
        return (
            <Marker
                position={{ lat, lng }}
                onMouseOver={isImage ? this.toggleOpen : undefined}
                onMouseOut={isImage ? this.toggleOpen : undefined}
                onClick={isImage ? undefined : this.toggleOpen}
                icon={icon}
            >
                {this.state.isOpen ? (
                    <InfoWindow onCloseClick={this.toggleOpen}>
                        <div>
                            {isImage ? (
                                <img
                                    className="around-marker-image"
                                    src={url}
                                    alt={message}
                                />
                            ) : (
                                <video
                                    className="around-marker-video"
                                    src={url}
                                    alt={message}
                                    controls
                                />
                            )}
                            <p>{`${user}: ${message}`}</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </Marker>
        );
    }
}

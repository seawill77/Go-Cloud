import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { AroundMarker } from "./AroundMarker.js";
import { POS_KEY } from "../constant.js";

class NormalAroundMap extends React.Component {
    reloadMarkers = () => {
        const center = this.getCenter();
        const radius = this.getRadius();
        if (this.props.topic === "around") {
            this.props.loadNearbyPosts(center, radius);
        } else {
            this.props.loadFacesAroundTheWorld();
        }
    };

    getCenter = () => {
        const center = this.map.getCenter();
        return { lat: center.lat(), lon: center.lng() };
    };

    getRadius = () => {
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new window.google.maps.LatLng(center.lat(), ne.lng());
            return (
                0.001 *
                window.google.maps.geometry.spherical.computeDistanceBetween(
                    center,
                    right
                )
            );
        }
    };

    render() {
        const { lat, lon: lng } = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <GoogleMap
                ref={mapInstance => {
                    this.map = mapInstance;
                }}
                defaultZoom={8}
                defaultCenter={{ lat, lng }}
                onDragEnd={this.reloadMarkers}
                onZoomChanged={this.reloadMarkers}
            >
                {/* <AroundMarker position={{ lat: -34.397, lng: 150.644 }} />
                <AroundMarker position={{ lat: -35.397, lng: 150.644 }} /> */}
                {this.props.posts.map(post => (
                    <AroundMarker post={post} key={post.url} />
                ))}
            </GoogleMap>
        );
    }
}

export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));

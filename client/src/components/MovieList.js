import React, {Component} from "react";

class MovieList extends Component {
    render() {
        return (
        <table>
            <tr>
                <td>Movies list:</td>
                <td>Username:</td> 
                <td>Movie list:</td>
                <td>Title:</td>
                <td>Tagline:</td>
                <td>Poster:</td>
                <td>Photo:</td>
                <td>Personal rating:</td>
            </tr>
        </table>
        );
    }
}

export default MovieList;
import React, { Component } from "react";
import BreadcrumbArea from "./BreadcrumbArea";
import { Link, Redirect } from "react-router-dom";
import { request, methods } from "../helpers/HttpHelper";

class ListForm extends Component {
  BASE_URL = "/api/lists/";
  ITEMS_BASE_URL = "/api/list_items/";
  MOVIES_BASE_URL = "/api/movies/";
  TMDB_URL = "http://api.themoviedb.org/3/";
  TMDB_API_KEY = "16123e88becca6a9619f714948738334";

  ERROR_TIMEOUT = 5000;
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      isNew: this.props.match.params.id === "add",
      shouldRedirect: false,
      listData: {
        id: this.props.match.params.id === "add" ? "" : this.props.match.params.id,
        listItems: []
      },
      searchResults: [],
      listItemsToSubmit: [],
      errors: []
    };
  }

  render() {
    return (
      <div className="col-md-11">
        <BreadcrumbArea />
        <form className="col-md-8 offset-md-2" >
          {this.showErrors()}
          <div className="form-group row btn-group">
            <Link id="backButton" name="back" className="btn" to="/admin/lists">Back</Link>
          </div>
          <div className="form-group row">
            <label htmlFor="listId" className="col-md-2 col-form-label">List ID: </label>
            <div className="col-md-10">
              <input type="text" id="listId" name="id" value={this.state.listData.id} readOnly className="form-control" onChange={ e => this.handleChange(e) }/>
            </div>
          </div>
          { 
            this.state.listData.listItems.length > 0
            ? <table className="table table-striped">
            <thead>
              <tr>
                <th>Movie ID</th>
                <th>Title</th>
                <th>Year of release</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.renderListItems()}
            </tbody>
            </table>
            : null
          }
          <hr/>
          <div className="form-group row">
            <label htmlFor="search" className="col-md-2 col-form-label">Add movie</label>
            <div className="col-md-10">
                <input 
                type="text" 
                name="search" 
                id="search" 
                placeholder="Search..." 
                className="form-control" 
                aria-describedby="button-addon"
                onChange={ e => this.handleSearch(e) } 
                onFocus={ e => this.handleSearch(e) }
                />
                { this.renderSearchResults() }
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-2 btn-group">
              <button id="submitButton" name="submit" className="btn btn-warning" onClick={ e => this.handleSubmit(e)}>Submit</button>
              <button id="saveButton" name="save" className="btn" onClick={ e => this.handleSave(e)}>Save</button>
            </div>
            <div className="col-md-1 offset-md-8">
              {
                this.state.listData.id === ""
                ? null
                : <button id="deleteButton" name="delete" className="btn btn-danger" onClick={ e => this.handleDelete(e)}>Delete</button>
              }
            </div>
          </div>
        </form>
        {
          this.state.shouldRedirect ? <Redirect to="/admin/lists"/> : null
        }
      </div>
    );    
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({ userData: {...this.state.userData, [name] : value}})
  }

  renderSearchResults = () => {
    return (
      <ul className="list-group search-list col-md-12">
        { 
          this.state.searchResults.map((searchResult, itemKey) => {
            return (
                <li className="list-group-item list-group-item-action" key={itemKey}>
                  {searchResult.title} ({searchResult.release_date.substring(0, 4)})
                  <a className="btn btn-warning btn-xs btn-item float-right" onClick={ () => this.addToList(searchResult)}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </a>
                </li>
            );
          })
        }
      </ul>
    );
  };

  resetSearch = e => {
    this.setState({
      searchResults: []
    });
  }

  renderListItems = () => {
    const {listItems} = this.state.listData;
    return listItems.map((listItem, itemKey) => {
      return (
      <tr key={itemKey}>
        <td>{listItem.id}</td>
        <td>{listItem.title}</td>
        <td>{listItem.release_date}</td>
        <td>
          <button className="btn btn-danger btn-sm btn-item" onClick={ e => { e.preventDefault(); this.removeFromList(itemKey)  }}>
          <i className="fa fa-trash"></i>
          </button>
        </td>
      </tr>
      );
    });
  }

  addToList = item => {
    this.resetSearch();
    const prevList = this.state.listData.listItems.filter(listItem => listItem.id !== item.id);
    this.setState({
      listData: {
        ...this.state.listData, 
        listItems: [
          ...prevList, 
          item
        ]
      }
    });
  }

  removeFromList = i => {
    const {listItems} = this.state.listData;
    listItems.splice(i, 1);
    this.setState({listData: {...this.state.listData, listItems: [...listItems]}});
  }

  validateList = () => {
    return this.state.listData.listItems.length > 0;
  }

  saveMovies = async () => {
    const {listItems} = this.state.listData;
    const newListItems = [];
    for (let item of listItems){
      const {
        adult, 
        backdrop_path, 
        budget,
        genre_ids, 
        homepage,
        id, 
        original_language, 
        original_title, 
        overview,
        popularity,
        poster_path,
        release_date,
        revenue,
        runtime,
        tagline,
        title,
        video,
        vote_average,
        vote_count,
      } = item;

      const movie = {
        tmdb_guid: id,
        budget: budget || 0,
        genres: "",
        homepage: homepage || "",
        imdb_id: "",
        original_language: original_language || "en-US",
        overview: overview || "",
        popularity: popularity || 0,
        poster_path: poster_path || "",
        release_date: release_date || "0000-00-00",
        revenue: revenue || 0,
        runtime: runtime || 0,
        tagline: tagline || title || "",
        title: title || "",
        vote_average: vote_average || 0,
        vote_count: vote_count || 0
      };

      try {
        const res = await request(this.MOVIES_BASE_URL, methods.POST, movie);
        const returnedMovie = await res.json();
        if(returnedMovie.success){
          newListItems.push({
            list_id: this.state.listData.id,
            movie_id: returnedMovie.data[0].movie_id,
            personal_rating: 0
          });
        } else {
          this.setErrors(["Error"]);
        }
      } catch (e) {
        this.setState({errors:[e.toString()]})
      }
    };

    this.setState({listItemsToSubmit: newListItems});
  }

  componentDidMount = () => {
    if(!this.state.isNew)
      this.populateList();
  }

  /**
   * TODO:: Refactor this nightmare
   */
  populateList = async () => {
    try{
      const res = await fetch(this.BASE_URL + this.state.listData.id);
      const json = await res.json();
      if(json.success){
        const listItems = [];
        const currentList = json.data[0];
        const res2 = await fetch(this.ITEMS_BASE_URL);
        const listItemsJson = await res2.json();
        
        if(listItemsJson.success){
          const currentItems = listItemsJson.data.filter(item => item.list_id === currentList.list_id);
          
          for(let item of currentItems){
            
            const res3 = await fetch(this.MOVIES_BASE_URL + item.movie_id);
            const moviesJson = await res3.json();
            
            if(moviesJson.success){
              const movie = moviesJson.data[0];
              listItems.push({
                id: movie.tmdb_guid,
                title: movie.title,
                release_date: movie.release_date
              });
            }
          }
          this.setState({
            listData: {
              id: currentList.list_id,
              listItems: listItems
            }
          });
        }
      }
    } catch(e){
      this.setErrors([e.toString()]);
    }
  }

  deleteOldListItems = async () => {
    const { id } = this.state.listData;
    const res2 = await fetch(this.ITEMS_BASE_URL);
    const listItemsJson = await res2.json();
    if(listItemsJson.success){
      const currentItems = listItemsJson.data.filter(item => item.list_id === id);
      for(let item of currentItems){
        const res = await request(this.ITEMS_BASE_URL + item.list_item_id, methods.DELETE);
        const json = await res.json();
        if(!json.success){
          console.error(json.err);
        }
      }
    }
  }

  saveListItems = async () => {
    for( let item of this.state.listItemsToSubmit ) {
      try {
        const res = await request(this.ITEMS_BASE_URL, methods.POST, item);
        const returnedItem = await res.json();
      } catch (e) {
        console.errror(e);
        this.setState({errors:[e.toString()]})
      }
    };
  }

  saveList = async () => {
    const {id} = this.state.listData;
    const method = id === "" ? methods.POST : methods.PATCH;
    try {
      const res = await request(this.BASE_URL + id, method, {user_id: 1});
      const currentList = await res.json();
      if(currentList.success){
        this.setState({listData: {...this.state.listData, id: currentList.data[0].list_id}});
      } else {
        this.setErrors([currentList.err.errors[0].message]);
      }
    } catch (e) {
      this.setErrors([e.toString()]);
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    if(this.validateList()){
      try {
        await this.deleteOldListItems();
        await this.saveList();
        await this.saveMovies();
        await this.saveListItems();
      } catch(e){
        this.setErrors([e.toString()]);
      }
      if(this.state.errors.length === 0){
        this.setState({shouldRedirect:true});
      }
    } else {
      this.setErrors(["You cannot submit an empty list"]);
    } 
  }

  handleSave = e => {
    e.preventDefault();
  }
  
  handleDelete = e => {
    e.preventDefault();
    if(window.confirm(`Are you sure you want to delete list ${this.state.listData.id}?`)){
      request(this.BASE_URL + this.state.listData.id, methods.DELETE);
      this.setState({shouldRedirect:true});
    }
  }

  handleSearch = async e => {
    let {value} = e.target;

    if(value.length > 4){
      const res = await fetch(`${this.TMDB_URL}search/movie?api_key=${this.TMDB_API_KEY}&language=en-US&include_adult=false&include_video=false&query="${value}"`);
      const list = await res.json();
      this.setState({ searchResults: list.results});
    } else {
      this.setState({ searchResults: []});
    }
  }

  setErrors = errors => {
    this.setState({ errors });
    setTimeout(this.resetErrors, this.ERROR_TIMEOUT);
  }

  resetErrors = () => {
    this.setState({ errors: []});
  }

  showErrors = () => {
    return this.state.errors.map((error, itemKey) => {
      return (
        <div className="alert alert-danger" role="alert" key={itemKey}>
          {error}
        </div>
      );
    })
  }
}
export default ListForm;

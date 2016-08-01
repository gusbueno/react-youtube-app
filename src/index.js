import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDou97s66bNNLKS9hSwspcktopV1J3gb9g';

// create new component. this component should produce some HTML
class App extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
         };

        this.videoSearch('pokemon go');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => { //{ videos } means { videos: videos } in es6
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
                 });
        });
    }

    render() {

        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
        
        return (
            <div>
                <SearchBar 
                    onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                videos={this.state.videos}
                onVideoSelect={selectedVideo => this.setState({selectedVideo})} />
            </div>
        )
    };
}

// take this component's generated html and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
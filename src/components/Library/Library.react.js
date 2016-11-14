import React from 'react';

import AppActions from '../../actions/AppActions';

class Library extends React.Component {
    static propTypes = {
        library: React.PropTypes.array,
        children: React.PropTypes.object,
        trackPlayingId: React.PropTypes.string,
        status: React.PropTypes.string,
        albums: React.PropTypes.array,
        filteredTracks: React.PropTypes.array
    };

    constructor(props) {
        super(props);
        this.addMusic = this.addMusic.bind(this);
        this.getLibraryComponent = this.getLibraryComponent.bind(this);
    }

    getLibraryComponent() {
        this.child = this.props.children.type.name;
        this.library = this.props.library;
        if (this.child === 'Albums') {
            this.library = this.props.albums;
        }

        if (this.props.library === null) {
            return (
                <div className='library-empty'>
                  <p>Loading library...</p>
                </div>
            );
        }

        if (this.props.library.length === 0) {
            return (
                <div className='library-empty'>
                  <p>Too bad, there is no music in your library =(</p>
                  <p className='sub-message'>
                    <span>nothing found yet, but that&apos;s fine, you can always </span>
                    <a onClick={ this.addMusic }>add your music here</a>
                  </p>
                </div>
            );
        }

        return React.cloneElement(this.props.children, {
            library: this.library,
            trackPlayingId: this.props.trackPlayingId,
            status: this.props.status,
            filteredTracks: this.props.filteredTracks
        });
    }

    addMusic() {
        AppActions.library.addFolders();
    }

    render() {
        return (
            <div className='library'>
              <div className='library-content'>
                {this.getLibraryComponent()}
              </div>
            </div>
        );
    }
}

export default Library;

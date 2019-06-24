import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'modules/home/post';
import Slider from "react-slick";
import MovieSection from 'components/MovieSection';
import settings from './SliderSettings';

class TitleList extends Component {
    componentWillReceiveProps(nextProps) {
        const { PostActions, urlString } = this.props;
        if (urlString !== nextProps.urlString) {
            PostActions.getMovie(nextProps.urlString);
        }
    }
    componentDidMount() {
        const { urlString, PostActions } = this.props;
        if (urlString !== '') {
            PostActions.getMovie(urlString);
        }
    }
    render() {
        let movieDataShow;
        const { title, moviedatas, sectionId } = this.props; console.log("tl", moviedatas.toJS());
        //console.log(this.props.urlString);

        if (moviedatas.toJS()[sectionId]) {
            const moviedataDetails = moviedatas.toJS()[sectionId].data.results;
            movieDataShow = moviedataDetails.map((mdetail, i) => {
                if (mdetail.backdrop_path)
                    var bgImg = 'http://image.tmdb.org/t/p/w500' + mdetail.backdrop_path;
                return (
                    <MovieSection
                        mdetail={mdetail}
                        bgImg={bgImg}
                        key={i}
                    />
                )
            })
        }
        return (
            <div className="collections-container">
                <div className="collections-row">
                    <h1 className="collections-row-name">{title}</h1>
                    <Slider {...settings}>
                        {movieDataShow}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        moviedatas: state.home.get('data')
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(TitleList);
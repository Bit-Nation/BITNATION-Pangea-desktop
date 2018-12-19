import { connect } from 'react-redux';
import { logout } from '../actions/user';
import Home from '../components/home';

const HomePage = connect(
    (state: any) => ({ ...state }),
    (dispatch: any) => ({
        logout: () => dispatch(logout()),
    }),
)(Home);

export default HomePage;

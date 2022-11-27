import Navbar from '../navbar'

const index = ({ children }) => {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    );
}

export default index;
import React, {useState} from 'react';
import Error from './Error';

const Form = ({saveSearch, saveCurrentPage}) => {
    const [searchParameter, saveParameter] = useState('');
    const [error, saveError] = useState(false);

    const searchSong = param =>{

        param.preventDefault();
        saveCurrentPage(1);
        //validate not empty
        if(searchParameter.trim() === ''){
            saveError(true)
            return;
        }
        saveError(false);

        //send search parameter to the main component
        saveSearch(searchParameter);
    }

    return ( 
        <form
        onSubmit={searchSong}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Bar for searching purposes"
                    onChange={e => saveParameter(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                    type="submit"
                    className="btn btn-lg btn-success btn-block rounded-lg"
                    value="Search"
                    ></input>
                </div>
            </div>
            { error ? <Error message="Search bar appears to be blank "/> : null }
        </form>
     );
}
 
export default Form;
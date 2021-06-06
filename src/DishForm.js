import { connect } from 'react-redux';
import { dishName, dishTime, dishType, dishNoSlices, dishDiameter, dishSpiciness, dishNoBread, responseSuccess, responseError } from './app/actions';

const handleSubmit = (e, dishForm, responseSuccess, responseError) => {
    e.preventDefault();
    if(dishForm.type === 'pizza') {
        delete dishForm.spiciness_scale;
        delete dishForm.slices_of_bread;
    } else if(dishForm.type === 'soup') {
        delete dishForm.no_of_slices;
        delete dishForm.diameter;
        delete dishForm.slices_of_bread;
    } else {
        delete dishForm.no_of_slices;
        delete dishForm.diameter;
        delete dishForm.spiciness_scale;
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dishForm)
    };

    fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (!response.ok) {
                console.log(data);
                return Promise.reject(data);
            }

            console.log(data);
            responseSuccess(data);
        })
        .catch(data => {
            responseError(data);
        });
}

export const DishForm = (props) => {
    const { 
    name,
    preparation_time,
    type,
    no_of_slices,
    diameter,
    spiciness_scale,
    slices_of_bread
    } = props.dishForm;

    const {
        dishName,
        dishTime,
        dishType,
        dishNoSlices,
        dishDiameter,
        dishSpiciness,
        dishNoBread,
        responseSuccess,
        responseError
    } = props;

    const pizza = (
        <>
        <label htmlFor="no_of_slices">Number of slices:</label>
        <input type="number" id="no_of_slices" name="no_of_slices" value={no_of_slices} min="1" onChange={(e) => dishNoSlices(parseInt(e.target.value))} required={type === 'pizza'? true : false}/>
        <br/>
        <label htmlFor="diameter">Diameter:</label>
        <input type="number" step="0.1" id="diameter" name="diameter" value={diameter} min="0.1" onChange={(e) => dishDiameter(parseFloat(e.target.value))} required={type === 'pizza'? true : false}/>
        </>
    );

    const soup = (
        <>
        <label htmlFor="spiciness_scale">Spiciness scale:</label>
        <input type="range" id="spiciness_scale" name="spiciness_scale" value={spiciness_scale} min="1" max="10" onChange={(e) => dishSpiciness(parseInt(e.target.value))} required={type === 'soup'? true : false}/>
        <p>Spiciness: {spiciness_scale}</p>
        </>
    );

    const sandwich = (
        <>
        <label htmlFor="slices_of_bread">Slices of bread:</label>
        <input type="number" id="slices_of_bread" name="slices_of_bread" value={slices_of_bread} min="1" onChange={(e) => dishNoBread(parseInt(e.target.value))} required={type === 'sandwich'? true : false}/>
        </>
    );

    const formByType = () => {
        switch (type) {
            case 'pizza': return pizza;
            case 'soup': return soup;
            case 'sandwich': return sandwich;
            default: return null;
        }
    }

    return (
        <div className="main">
            <div className="formContainer">
                <h2>Create your dish</h2>
                <form onSubmit={(e) => handleSubmit(e, props.dishForm, responseSuccess, responseError)}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => dishName(e.target.value)} required/>
                    <br/>
                    <label htmlFor="preparation_time">Preparation time:</label>
                    <input type="time" id="preparation_time" name="preparation_time" step="1" value={preparation_time} onChange={(e) => dishTime(e.target.value)} required/>
                    <br/>
                    <label htmlFor="type">Choose a dish:</label>
                    <select name="type" id="type" onChange={(e) => dishType(e.target.value)}>
                        <option value="pizza" defaultValue>Pizza</option>
                        <option value="soup">Soup</option>
                        <option value="sandwich">Sandwich</option>
                    </select>
                    <br/>
                    {formByType()}
                    <br/>
                    <button type="submit">Compose dish</button>
                </form>
            </div>
            <div className="ordersContainer">
                <h2>Your orders:</h2>
                {props.orders.map(order => {
                    let content = null;

                    switch(order.type) {
                        case 'pizza': content = (<p>Type: pizza, Number of slices: {order.no_of_slices}, Diameter: {order.diameter}</p>); break;
                        case 'soup': content = (<p>Type: soup, Spiciness scale: {order.spiciness_scale}</p>); break;
                        case 'sandwich': content = (<p>Type: sandwich, Slices of bread: {order.slices_of_bread}</p>); break;
                        default: return null;
                    }

                    return (
                    <div key={order.id}>
                        <p>ID: {order.id} Name: {order.name}</p>
                        {content}
                        <hr/>
                    </div>
                )})}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { 
        dishForm: state.dishReducer,
        orders: state.responseReducer 
    }
};

const mapDispatchToProps = { dishName, dishTime, dishType, dishNoSlices, dishDiameter, dishSpiciness, dishNoBread, responseSuccess, responseError };
  
export const DishFormContainer = connect(mapStateToProps, mapDispatchToProps)(DishForm);
  
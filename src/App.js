import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import AddProductForm from './components/AddProduct/AddProductForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/add" component={AddProductPage} />
        </Switch>
      </div>
    </Router>
  );
};

const AddProductPage = () => {
  return (
    <div>
      <h2>Add Product</h2>
      <AddProductForm categories={['Electronics', 'Clothing', 'Books']} onSubmit={handleSubmit} />
    </div>
  );
};

// Function to handle form submission (to be implemented)
const handleSubmit = values => {
  // Placeholder for form submission
  console.log('Form submitted with values:', values);
};

export default App;

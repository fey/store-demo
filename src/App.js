import React, { Component } from "react";
import {HashRouter, Route} from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

import { InventoryList } from './features/inventory/InventoryList';
import { PhysicalList } from './features/physical/PhysicalList';
import { ManageInventory } from './features/manage/ManageInventory';
import { VirtualList } from './features/virtual/VirtualList';
import { ServerPurchase } from "./features/serverPurchase/ServerPurchase";
import { EntitlementList } from "./features/entitlement/EntitlementList";
import { Cart } from "./features/cart/Cart";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader.js";
import { ProductConsumer } from "./context";
import VCPackagesList from "./components/VCPackagesList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <HashRouter basename='/'>
        <ProductConsumer>
          {valueFromContext => {
            return (
              <React.Fragment>
                  {
                      valueFromContext.showCartError
                      &&
                      <Alert onClose={valueFromContext.hideCartError} className={"application-alert"} variant="danger" dismissible>
                          <Alert.Heading>{valueFromContext.cartError.title}</Alert.Heading>
                          <p>{valueFromContext.cartError.message}</p>
                      </Alert>
                  }
                <div className="">
                  {/* <Navbar showCart={valueFromContext.showCart} /> */}
                  <div>
                    <CssStore0>
                      <Cart />
                      <Route path="/" exact component={VirtualList} />
                      <Route path="/inventory" render={() => (!valueFromContext.fetching && <InventoryList {...valueFromContext} />)} />
                      <Route path="/crystals" render={() => (!valueFromContext.fetching && <VCPackagesList {...valueFromContext} />)} />
                      <Route path="/physical" render={() => (!valueFromContext.fetching && <PhysicalList {...valueFromContext} />)} />
                      <Route path="/entitlement" render={() => (!valueFromContext.fetching && <EntitlementList {...valueFromContext} />)} />
                      <Route path="/manage" render={() => (!valueFromContext.fetching && <ManageInventory {...valueFromContext} />)} />
                      <Route path="/purchase" render={() => (!valueFromContext.fetching && <ServerPurchase {...valueFromContext} />)} />
                      {valueFromContext.fetching && <Preloader />}
                    </CssStore0>
                  </div>
                </div>

                <div className="global-background">
                  <div className="global-background-tint" />
                </div>
              </React.Fragment>
            );
          }}
        </ProductConsumer>
      </HashRouter>
    );
  }
}

const CssStore0 = styled.div`
  z-index: 1;
`;

export default App;
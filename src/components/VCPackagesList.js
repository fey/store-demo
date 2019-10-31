import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import Product from "./Product";
import StoreLoader from "./StoreLoader";

class VCPackagesList extends Component {
  constructor(props) {
    super(props);
    this.ProductRef = React.createRef();
    this.state = {};
    this.changeGroupHandler = this.changeGroupHandler.bind(this);
    this.changeGroupHandler(10); // Костыль
  }

  changeGroupHandler = newActive => {
    this.props.setStateFrom("activeGroup", newActive);
  };

  componentDidMount() {
    if (this.props.logToken && !this.props.virtualItems) {
      this.props.setStateFrom("fetching", true);
      StoreLoader(window.xProjectId, this.props.logToken).then(allData => {
        this.props.setCurrs(allData);
      });

      this.props.updateVirtualCurrencyBalance();
    }
  }

  render() {
    return (
      <div>
        <ProductConsumer>
          {
            valueFromContext => {
              return (
                <div>
                  <CssStore00
                    style={{
                      backgroundColor: "transparent",
                      color: valueFromContext.theme["colorText"]
                    }}
                  >
                    {valueFromContext.activeModule === "virtualItems" &&
                    valueFromContext.virtualCurrencyPackages && (
                      <CssProductList>
                        <СssGroup>
                          {
                            valueFromContext.virtualCurrencyPackages.map((oneProduct, key) => {
                              return (
                                  <Product
                                      ref={this.ProductRef}
                                      key={oneProduct.sku}
                                      order={key}
                                      initClass="initialFlow1"
                                      sku={oneProduct.sku}
                                      title={oneProduct.name}
                                      description={
                                        oneProduct.description
                                      }
                                      price={oneProduct.price.amount}
                                      image_url={oneProduct.image_url}
                                      currency={
                                        oneProduct.price.currency
                                      }
                                      product={oneProduct}
                                      addToCart={
                                        valueFromContext.addToCart
                                      }
                                      getTheme={valueFromContext.getTheme.bind(
                                          this
                                      )}
                                      cartId={valueFromContext.cartId}
                                      logToken={
                                        valueFromContext.logToken
                                      }
                                      changeItemQuantityInCart={
                                        valueFromContext.changeItemQuantityInCart
                                      }
                                      activeGroup={this.props.activeGroup}
                                      buyByVC={
                                        valueFromContext.buyByVC
                                      }
                                  />
                              );
                            })}
                        </СssGroup>
                      </CssProductList>
                    )}
                  </CssStore00>
                </div>
              );
            }
          }
        </ProductConsumer>
      </div>
    );
  }
}

const CssStore00 = styled.div`
  position: relative;
  z-index: 4;
`;
const CssProductList = styled.div`
  /* position: relative;
  z-index: 4; */
`;

const CssMenu = styled.div`
  /* display: flex; */
  align-items: center;
  flex-grow: 1;
  margin: 24px 0;
`;

const СssGroup = styled.div`
  /* width: '100%'; */
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
  /* justify-content: center; */
  /* align-items: center; */
  /* justify-content: center; */
  /* display: grid; */
  /* grid-template-columns: repeat( auto-fit, minmax(260px, 320px)); */
  /* grid-row-gap: 24px; */
  place-content: center;
`;

const СssTitle = styled.div`
  color: ${props => props.getTheme("colorText")};
  padding-top: 2em;
  min-height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  font-size: 1.2em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export default VCPackagesList;
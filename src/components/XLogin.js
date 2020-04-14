import React, { Component } from 'react';
import styled from 'styled-components';
import Cookie, { parseJwt } from '../utils/cookie';

export default class XLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: true,
      logToken: null,
      psToken: null,
    };
  }

  unauthorizedFlow = () => {
    this.setState({ logToken: null });
    this.setState({ shown: true });
  };

  authorizedFlow = tkn => {
    this.setState({ logToken: tkn, shown: false });
    this.user = parseJwt(tkn);
  };

  render() {
    return (
      <div>
        <CssXpop style={{ display: this.state.shown ? 'flex' : 'none' }}>
          <CssXpopB>
            <CssLoginPop>
              <div id='xl_auth' />
            </CssLoginPop>

            <CssLoginInfo>
              {myProjects.map((onePr, i) => {
                let pr = onePr['project_id'];
                let url = window.location.origin;
                return (
                  <div key={pr + i} style={{ marginBottom: '1em' }}>
                    <div style={{ fontSize: '0.4em' }}>
                      <a href={url}>
                        {pr}: {onePr.projectName}
                      </a>
                    </div>
                  </div>
                );
              })}
              <p>
                Open any Xsolla Store using GET parameters <br />
                <b>project_id</b> and <b>login_id</b> (login must point back to
                {window.location.origin})
              </p>
            </CssLoginInfo>
          </CssXpopB>
          <CssXpopZ />
        </CssXpop>
      </div>
    );
  }

  componentDidMount() {
    window.XloginInit();
    let cke = Cookie();
    cke ? this.authorizedFlow(cke) : this.unauthorizedFlow();
  }
}

const CssXpop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  overflow-y: scroll;
  padding: 40px 0;
`;
const CssXpopB = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100%;
  z-index: 100;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
`;
const CssXpopZ = styled.div`
  position: fixed;
  z-index: 99;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const CssLoginInfo = styled.div`
  padding: 20px 70px;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  font-size: 22px;
  width: 600px;
  & a {
    /* font-family: 'PS Mono', Courier, monospace; */
    text-decoration: underline;
    font-size: 28px;
    line-height: 0px;
  }
`;
const CssLoginPop = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  padding: 36px;
  overflow: hidden;
  margin: 0 70px;
  border-radius: 8px;
`;

const myProjects = [
  {
    projectName: 'Xsolla Store Demo',
    project_id: 47278,
    login_id: 'fb2d7c69-bf25-11e9-9244-42010aa80004',
  },
];

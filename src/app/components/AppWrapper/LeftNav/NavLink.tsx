import * as React from 'react';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class NavLink extends React.Component<{
  href: string;
  text: string;
}> {
  render() {
    const renderLink = itemProps => <Link to={this.props.href} {...itemProps} />;

    return (
      <ListItem button component={renderLink}>
        {this.props.children}
        <ListItemText inset primary={this.props.text} />
      </ListItem>
    );
  }
}
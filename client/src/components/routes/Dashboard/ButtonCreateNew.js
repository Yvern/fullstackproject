import { Button } from 'semantic-ui-react';

export const ButtonCreateNew = text => (
  <div className="squad-segment create-squad-segment">
    <div>
      <Button className="create-new-squad-button" fluid>
        {this.props.text} <Icon name="add circle" color="blue" />
      </Button>
    </div>
  </div>
);

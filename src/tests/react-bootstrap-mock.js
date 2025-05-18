// Mock for react-bootstrap components
jest.mock('react-bootstrap', () => {
  const React = require('react');
  
  // Create mock components that render their children
  const createMockComponent = (name) => {
    const component = ({ children, ...props }) => {
      return React.createElement('div', { 'data-testid': `mock-${name}`, ...props }, children);
    };
    return component;
  };

  // Create mock for Modal with its subcomponents
  const Modal = createMockComponent('modal');
  Modal.Header = createMockComponent('modal-header');
  Modal.Title = createMockComponent('modal-title');
  Modal.Body = createMockComponent('modal-body');
  Modal.Footer = createMockComponent('modal-footer');

  // Create mock for Form with its subcomponents
  const Form = createMockComponent('form');
  Form.Group = createMockComponent('form-group');
  Form.Label = createMockComponent('form-label');
  Form.Control = createMockComponent('form-control');
  Form.Text = createMockComponent('form-text');
  Form.Check = createMockComponent('form-check');
  Form.Select = createMockComponent('form-select');

  // Create mock for other components
  const Card = createMockComponent('card');
  Card.Img = createMockComponent('card-img');
  Card.Body = createMockComponent('card-body');
  Card.Title = createMockComponent('card-title');
  Card.Text = createMockComponent('card-text');

  const Button = createMockComponent('button');
  const Badge = createMockComponent('badge');
  const InputGroup = createMockComponent('input-group');
  InputGroup.Text = createMockComponent('input-group-text');

  return {
    Modal,
    Form,
    Card,
    Button,
    Badge,
    InputGroup
  };
});
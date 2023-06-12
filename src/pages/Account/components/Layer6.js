import React, { useEffect, useRef} from 'react';
import { Card, Label, Icon, Button, Checkbox } from 'semantic-ui-react';
import MermaidChart from './MermaidChart';
import mermaid from 'mermaid';

function Layer6() {
  const cards = [
    {
      header: 'Project Timeline 1',
      meta: 'Joined in 2013',
      events: [
        { name: 'Elliot Fu', action: 'added', target: 'Jenny Hess', role: 'project' },
        { name: 'Stevie Feliciano', action: 'was added as an', target: 'Administrator' },
        { name: 'Helen Troy', action: 'added', target: 'two pictures' },
      ],
      link: 'http://example.com',
    },
    {
      header: 'Project Timeline 1',
      meta: 'Joined in 2013',
      events: [
        { name: 'Elliot Fu', action: 'added', target: 'Jenny Hess', role: 'project' },
        { name: 'Stevie Feliciano', action: 'was added as an', target: 'Administrator' },
        { name: 'Helen Troy', action: 'added', target: 'two pictures' },
      ],
      link: 'http://example.com',
    },
    {
      header: 'Project Timeline 1',
      meta: 'Joined in 2013',
      events: [
        { name: 'Elliot Fu', action: 'added', target: 'Jenny Hess', role: 'project' },
        { name: 'Stevie Feliciano', action: 'was added as an', target: 'Administrator' },
        { name: 'Helen Troy', action: 'added', target: 'two pictures' },
      ],
      link: 'http://example.com',
    },
    {
      header: 'Project Timeline 1',
      meta: 'Joined in 2013',
      events: [
        { name: 'Elliot Fu', action: 'added', target: 'Jenny Hess', role: 'project' },
        { name: 'Stevie Feliciano', action: 'was added as an', target: 'Administrator' },
        { name: 'Helen Troy', action: 'added', target: 'two pictures' },
      ],
      link: 'http://example.com',
    },
    // 更多卡片数据...
  ];

  return (
    <Card.Group itemsPerRow={3} stackable style={{ width: '80%', height: '80%', marginLeft: '5%', marginTop:"1%" }}>
      {cards.map((card, index) => (
        <Card key={index} fluid  className="orange">
          <Card.Content>
            <Card.Header>{card.header}</Card.Header>
            <Card.Description>{card.meta}</Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Description>
              今天要幹嘛啊～<br />
              可能打打程式
            </Card.Description>
            {card.events.map((event, eventIndex) => (
              <div key={eventIndex}>
                <Checkbox label={`${event.name} ${event.action} ${event.target}`} />
              </div>
            ))}
          </Card.Content>
          <Card.Content extra>
            
            <Label color='teal'>Featured</Label>
            <Label color='teal'>Featured</Label>
            <Label color='teal'>Featured</Label>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
}

export default Layer6;


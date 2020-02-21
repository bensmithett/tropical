import React from 'react'
import Markdown, {Feature} from './markdown'
import Background from '../background/background'

export default { title: 'Markdown' }

export const normal = () => (
  <Background>
    <Markdown>
      <h2>Heading level 2</h2>
      <p>
        The San Blas Islands of Panama is an <code>archipelago</code> comprising approximately 365 islands and cays, of which 49 are inhabited. They lie off the north coast of the Isthmus of Panama, east of the Panama Canal. A part of the comarca (district) <a href='https://en.wikipedia.org/wiki/Guna_Yala'>Guna Yala</a> along the Caribbean coast of Panama is home to the Guna people.
      </p>

      <ul>
        <li>San Blas and its surrounding area is a haven for <a href='#'>ecotourism</a> because of its pristine environs.</li>
        <li>The area is also popular for sailing, <code>as it is known for</code> its beauty and lack of hurricanes.</li>
        <li>
          Notable locations in the Archipelago are:
          <ul>
            <li>the main capital El Porvenir</li>
            <li>the densely crowded island village of Carti Sugtupu</li>
            <li> and the two keys, Cayos Limones, and Cayos Holandeses, both renowned for their clear waters.</li>
          </ul>
        </li>
        <li>The islands could be rendered uninhabitable by sea level rise in the late 21st century.</li>
      </ul>

      <Feature>Feature paragraph</Feature>
      <p>Regular paragraph</p>
    </Markdown>
  </Background>
)

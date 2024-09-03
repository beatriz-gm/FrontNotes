import { Container, Links, Content } from './styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { api } from '../../services/api';

import { Tag } from '../../components/tag';
import { Header } from '../../components/header';
import { Button } from '../../components/button';
import { Section } from '../../components/section';
import { ButtonText } from '../../components/buttonText';

export function Details() {
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleDelete() {
    const confirm = window.confirm("Do you really want to delete the note?")

    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }

    fetchNote();
  }, []);

  return(
    <Container>

      <Header/>

    {
      // o main está envolvido em chaves e com o seguinte código porque apenas será mostrado caso haja conteúdo, se não tem, não mostra nada
      data && 
      <main>
        <Content>
          <ButtonText title="Delete note" onClick={handleDelete} />

          <h1>
            {data.title}
          </h1>

          <p>
            {data.description}
          </p>

          {
            data.links &&
            <Section title="Useful links">
              <Links>
                {
                  data.links.map(link => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank" >
                        {link.url}
                      </a>
                    </li>
                  ))
                }
              </Links>
            </Section>
          }

          {
            data.tags &&
            <Section title="Markers">
              {
                data.tags.map(tag => (
                  <Tag
                    key={String(tag.id)}
                    title={tag.name}
                  />
                ))
              }
            </Section>
          }

          <Button name="Back" onClick={handleBack} />
        </Content>
      </main>
    }

    </Container>
  )
}
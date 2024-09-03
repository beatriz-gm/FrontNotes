import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {Header} from '../../components/header';
import {Input} from '../../components/input';
import {TextArea} from '../../components/textArea';
import {NoteItem} from '../../components/noteItem';
import {Section} from '../../components/section';
import {Button} from '../../components/button';
import { ButtonText } from '../../components/buttonText';

import {api} from '../../services/api';

import { Container, Form } from './styles';

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleDeleteLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted));
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleDeleteTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  async function handleNewNote() {
    if(!title) {
      return alert("Type the note title!")
    }
    
    if (newLink) {
      return alert("Click add to save the typed link on your note!");
    }

    if (newTag) {
      return alert("Click add to save the typed tag on your note!")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("Note created sucessfully!");
    navigate(-1);
  }

  return(
    <Container>
      <Header/>

      <main>
        <Form>
          <header>
            <h1>Create Note</h1>
            <ButtonText 
              title="Back" 
              onClick={handleBack}
            />
          </header>

          <Input 
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
          />
          <TextArea 
            placeholder="Description"
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Useful links">
            {
              links.map((link, index) => (
                <NoteItem 
                  key={String(index)}
                  value={link}
                  onClick={() => handleDeleteLink(link)}
                />
              ))
            }
            <NoteItem 
              isNew 
              placeholder='New link'
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>
          
          <Section title="Markers">
            <div className='tags'>
              {
                tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag}
                    onClick={() => handleDeleteTag(tag)}
                  />

                ))
              }
              <NoteItem 
                isNew 
                placeholder='New tag'
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button 
            name="Save"
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  );
}
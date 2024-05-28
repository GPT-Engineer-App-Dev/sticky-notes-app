import { useState } from "react";
import { Box, Button, Container, Flex, Heading, IconButton, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const handleAddNote = () => {
    if (title.trim() && body.trim()) {
      const newNote = { id: Date.now(), title, body };
      setNotes([...notes, newNote]);
      setTitle("");
      setBody("");
    }
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setTitle(noteToEdit.title);
    setBody(noteToEdit.body);
    setIsEditing(true);
    setCurrentNoteId(id);
  };

  const handleUpdateNote = () => {
    setNotes(notes.map((note) => (note.id === currentNoteId ? { ...note, title, body } : note)));
    setTitle("");
    setBody("");
    setIsEditing(false);
    setCurrentNoteId(null);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Container maxW="container.xl" p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="lg">Note Taking App</Heading>
      </Flex>
      <Box mb={4}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={2}
        />
        <Textarea
          placeholder="Take a note..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          mb={2}
        />
        {isEditing ? (
          <Button colorScheme="blue" onClick={handleUpdateNote}>Update Note</Button>
        ) : (
          <Button colorScheme="teal" onClick={handleAddNote}>Add Note</Button>
        )}
      </Box>
      <VStack spacing={4}>
        {notes.map((note) => (
          <Box key={note.id} p={4} borderWidth="1px" borderRadius="md" w="100%">
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <Heading as="h3" size="md">{note.title}</Heading>
                <Text mt={2}>{note.body}</Text>
              </Box>
              <Box>
                <IconButton
                  aria-label="Edit"
                  icon={<FaEdit />}
                  mr={2}
                  onClick={() => handleEditNote(note.id)}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<FaTrash />}
                  onClick={() => handleDeleteNote(note.id)}
                />
              </Box>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
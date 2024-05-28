import { useState } from "react";
import { Box, Container, VStack, HStack, Input, Textarea, Button, Heading, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const toast = useToast();

  const handleAddNote = () => {
    if (title.trim() === "" || body.trim() === "") {
      toast({
        title: "Error",
        description: "Title and body cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newNote = { title, body };
    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = newNote;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, newNote]);
    }

    setTitle("");
    setBody("");
  };

  const handleEditNote = (index) => {
    setTitle(notes[index].title);
    setBody(notes[index].body);
    setEditIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <Container maxW="container.lg" p={4}>
      <Heading mb={4}>Note Taking App</Heading>
      <VStack spacing={4} align="stretch">
        <Box>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb={2}
          />
          <Textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            mb={2}
          />
          <Button onClick={handleAddNote} colorScheme="teal">
            {editIndex !== null ? "Update Note" : "Add Note"}
          </Button>
        </Box>
        {notes.map((note, index) => (
          <Box key={index} p={4} shadow="md" borderWidth="1px" borderRadius="md">
            <HStack justify="space-between">
              <VStack align="start">
                <Heading size="md">{note.title}</Heading>
                <Box>{note.body}</Box>
              </VStack>
              <HStack>
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => handleEditNote(index)}
                  aria-label="Edit Note"
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => handleDeleteNote(index)}
                  aria-label="Delete Note"
                />
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
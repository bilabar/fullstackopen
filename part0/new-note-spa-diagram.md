```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user types new note, and clicks Save button 
    Note right of browser: The browser re-renders the notes
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server
```

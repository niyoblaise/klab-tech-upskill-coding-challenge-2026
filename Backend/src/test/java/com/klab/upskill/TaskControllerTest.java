package com.klab.upskill;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.klab.upskill.Controller.TaskController;
import com.klab.upskill.Entity.enums.TaskPriority;
import com.klab.upskill.Entity.enums.TaskStatus;
import com.klab.upskill.Service.TaskService;
import com.klab.upskill.dto.TaskRequestDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());

    @MockitoBean
    private TaskService taskService;

    @Test
    @DisplayName("POST /tasks should return 400 Bad Request when title is blank")
    void createTask_BlankTitle_Returns400() throws Exception {
        TaskRequestDto invalidDto = TaskRequestDto.builder()
                .title("")
                .priority(TaskPriority.HIGH)
                .status(TaskStatus.PENDING)
                .build();

        mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.title").exists());
    }
}
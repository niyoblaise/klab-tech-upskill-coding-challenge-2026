package com.klab.upskill.Service;

import com.klab.upskill.Entity.Task;
import com.klab.upskill.Entity.enums.TaskStatus;
import com.klab.upskill.Repository.TaskRepository;
import com.klab.upskill.dto.TaskRequestDto;
import com.klab.upskill.dto.TaskResponseDto;
import com.klab.upskill.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public Page<TaskResponseDto> getTasks(TaskStatus status, String search, Pageable pageable) {
        String query = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "status")
                    .and(Sort.by(Sort.Direction.DESC, "createdAt"))
                    .and(Sort.by(Sort.Direction.DESC, "id"))
        );
        return taskRepository.findByStatusAndSearch(status, query, sortedPageable)
                .map(this::mapToDto);
    }

    public TaskResponseDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + id));
        return mapToDto(task);
    }

    public TaskResponseDto createTask(TaskRequestDto dto) {
        Task task = Task.builder()
                .title(dto.getTitle().trim())
                .description(dto.getDescription())
                .priority(dto.getPriority())
                .status(dto.getStatus() != null ? dto.getStatus() : TaskStatus.PENDING)
                .build();
        return mapToDto(taskRepository.save(task));
    }

    public TaskResponseDto updateTask(Long id, TaskRequestDto dto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + id));

        task.setTitle(dto.getTitle().trim());
        task.setDescription(dto.getDescription());
        task.setPriority(dto.getPriority());
        if (dto.getStatus() != null) {
            task.setStatus(dto.getStatus());
        }

        return mapToDto(taskRepository.save(task));
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task not found with ID: " + id);
        }
        taskRepository.deleteById(id);
    }

    private TaskResponseDto mapToDto(Task task) {
        return TaskResponseDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .createdAt(task.getCreatedAt())
                .build();
    }
}
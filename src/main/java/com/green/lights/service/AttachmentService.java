package com.green.lights.service;

import com.green.lights.service.dto.AttachmentDTO;
import java.util.List;

/**
 * Service Interface for managing Attachment.
 */
public interface AttachmentService {

    /**
     * Save a attachment.
     *
     * @param attachmentDTO the entity to save
     * @return the persisted entity
     */
    AttachmentDTO save(AttachmentDTO attachmentDTO);

    /**
     *  Get all the attachments.
     *  
     *  @return the list of entities
     */
    List<AttachmentDTO> findAll();

    /**
     *  Get the "id" attachment.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    AttachmentDTO findOne(Long id);

    /**
     *  Delete the "id" attachment.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the attachment corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @return the list of entities
     */
    List<AttachmentDTO> search(String query);
}

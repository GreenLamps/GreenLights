package com.green.lights.service;

import com.green.lights.service.dto.CategoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Category.
 */
public interface CategoryService {

    /**
     * Save a category.
     *
     * @param categoryDTO the entity to save
     * @return the persisted entity
     */
    CategoryDTO save(CategoryDTO categoryDTO);

    /**
     *  Get all the categories.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<CategoryDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" category.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    CategoryDTO findOne(Long id);

    /**
     *  Delete the "id" category.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * find by level
     * @param level
     * @return
     */
    List<CategoryDTO> findAllByLevel(Integer level);

    /**
     * Search for the category corresponding to the query.
     *
     *  @param query the query of the search
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<CategoryDTO> search(String query, Pageable pageable);
}

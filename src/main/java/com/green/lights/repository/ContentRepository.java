package com.green.lights.repository;

import com.green.lights.domain.Content;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Content entity.
 */
@SuppressWarnings("unused")
public interface ContentRepository extends JpaRepository<Content,Long> {
    /**
     * find by category
     * @param id
     * @param pageable
     * @return
     */
    @Query("select new Content(c.id, c.title, c.source, c.author, c.cover, c.hot, c.state, c.viewCount, c.createTime, c.category, c.url, c.location) " +
        "from Content c where c.category.id = :id order by c.createTime desc ")
    Page<Content> findByCategory(@Param("id") Long id, Pageable pageable);

    Content findTopByCategoryIdOrderByHotDesc(Long categoryId);
    Content findTopByCategoryIdAndIdLessThanOrderByCreateTimeDesc(Long categoryId, Long Id);
    Content findTopByCategoryIdAndIdGreaterThanOrderByCreateTimeDesc(Long categoryI, Long Id);
}

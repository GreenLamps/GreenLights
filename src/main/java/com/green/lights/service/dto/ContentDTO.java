package com.green.lights.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Content entity.
 */
public class ContentDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 64)
    private String title;

    private String source;

    private String author;

    private String cover;

    @Lob
    private byte[] image;
    private String imageContentType;

    private String content;

    private Integer hot;

    private Integer state;

    private Integer viewCount;

    private ZonedDateTime createTime;

    private Long categoryId;

    private String url;

    private String location;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getHot() {
        return hot;
    }

    public void setHot(Integer hot) {
        this.hot = hot;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getViewCount() {
        return viewCount;
    }

    public void setViewCount(Integer viewCount) {
        this.viewCount = viewCount;
    }

    public ZonedDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(ZonedDateTime createTime) {
        this.createTime = createTime;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ContentDTO contentDTO = (ContentDTO) o;
        if (contentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContentDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", source='" + getSource() + "'" +
            ", author='" + getAuthor() + "'" +
            ", cover='" + getCover() + "'" +
            ", image='" + getImage() + "'" +
            ", content='" + getContent() + "'" +
            ", hot='" + getHot() + "'" +
            ", state='" + getState() + "'" +
            ", viewCount='" + getViewCount() + "'" +
            ", createTime='" + getCreateTime() + "'" +
            "}";
    }
}
